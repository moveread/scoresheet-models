from typing import Literal
from dataclasses import dataclass
from haskellian import Either, Left, Right
from pydantic import ValidationError
from azure.storage.blob.aio import ContainerClient, BlobServiceClient
from azure.core.exceptions import ResourceNotFoundError
from .model import Model

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
  async with ContainerClient(STORAGE_ACCOUNT, CONTAINER) as cc:
    try:
      return Right([name.split('.')[0] async for name in cc.list_blob_names()])
    except ResourceNotFoundError as e:
      return Left(NotFound('not-found', str(e)))
    except Exception as e:
      return Left(UnknownErr('unknown', e))

async def fetch_model(id: str) -> Either[FetchErr, Model]:
  async with ContainerClient(STORAGE_ACCOUNT, CONTAINER) as cc:
    try:
      blob = await cc.download_blob(id + '.json')
      data = await blob.readall()
      return Right(Model.model_validate_json(data))
    except ResourceNotFoundError as e:
      return Left(NotFound('not-found', str(e)))
    except ValidationError as e:
      return Left(InvalidData('invalid-data', str(e)))
    except Exception as e:
      return Left(UnknownErr('unknown', e))
  
def models_kv(conn_str: str):
  from kv.azure.blob import BlobContainerKV
  return BlobContainerKV[Model].validated(
    Model, client=BlobServiceClient.from_connection_string(conn_str),
    container='scoresheet-models',
  )

async def save_model(id: str, model: Model, *, conn_str: str):
  kv = models_kv(conn_str)
  r = await kv.insert(id + '.json', model)
  return r


def images_kv(conn_str: str):
  from kv.azure.blob import BlobContainerKV
  return BlobContainerKV.from_conn_str(conn_str, 'model-images')