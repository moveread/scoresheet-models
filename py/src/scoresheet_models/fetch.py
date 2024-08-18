from typing import Literal
from dataclasses import dataclass
from haskellian import Either, Left, Right, either as E
from pydantic import ValidationError
from robust_extraction2 import ExtendedModel

STORAGE_ACCOUNT = 'https://movereadcdn.blob.core.windows.net/'
CONTAINER = 'scoresheet-models'

@dataclass
class NotFound:
  tag: Literal['not-found']
  detail: str

@dataclass
class InvalidData:
  tag: Literal['invalid-data']
  detail: str

@dataclass
class UnknownErr:
  tag: Literal['unknown']
  exception: Exception

FetchErr = NotFound | InvalidData | UnknownErr

async def fetch_models() -> Either[NotFound | UnknownErr, list[str]]:
  from azure.storage.blob.aio import ContainerClient, BlobServiceClient
  from azure.core.exceptions import ResourceNotFoundError
  async with ContainerClient(STORAGE_ACCOUNT, CONTAINER) as cc:
    try:
      return Right([name.split('.')[0] async for name in cc.list_blob_names()])
    except ResourceNotFoundError as e:
      return Left(NotFound('not-found', str(e)))
    except Exception as e:
      return Left(UnknownErr('unknown', e))

async def fetch_model(id: str) -> Either[FetchErr, ExtendedModel]:
  from azure.storage.blob.aio import ContainerClient
  from azure.core.exceptions import ResourceNotFoundError
  async with ContainerClient(STORAGE_ACCOUNT, CONTAINER) as cc:
    try:
      blob = await cc.download_blob(id + '.json')
      data = await blob.readall()
      return Right(ExtendedModel.model_validate_json(data))
    except ResourceNotFoundError as e:
      return Left(NotFound('not-found', str(e)))
    except ValidationError as e:
      return Left(InvalidData('invalid-data', str(e)))
    except Exception as e:
      return Left(UnknownErr('unknown', e))
    
class ModelsCache:
  def __init__(self, models: dict[str, ExtendedModel] = {}):
    self.models = models

  def __repr__(self):
    return f'ModelsCache({repr(self.models)})'

  @E.do[FetchErr]()
  async def fetch(self, id: str):
    if id not in self.models:
      self.models[id] = (await fetch_model(id)).unsafe()
    return self.models[id]

  
def models_kv(conn_str: str):
  from kv.azure.blob import BlobContainerKV
  from azure.storage.blob.aio import BlobServiceClient
  return BlobContainerKV[ExtendedModel].new(
    client=lambda: BlobServiceClient.from_connection_string(conn_str),
    type=ExtendedModel, container='scoresheet-models',
  )

async def save_model(id: str, model: ExtendedModel, *, conn_str: str):
  kv = models_kv(conn_str)
  r = await kv.insert(id + '.json', model)
  return r


def images_kv(conn_str: str):
  from kv.azure.blob import BlobContainerKV
  return BlobContainerKV.from_conn_str(conn_str, 'model-images')