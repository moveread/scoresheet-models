from typing import TypedDict, Annotated, NotRequired
import numpy as np
from .model import Model

class RequiredPads(TypedDict):
  l: float; r: float; t: float; b: float

class Pads(TypedDict):
  l: NotRequired[float]; r: NotRequired[float]; t: NotRequired[float]; b: NotRequired[float]

def unpack(*, l: float, r: float, t: float, b: float):
  return l, r, t, b

Vec2 = tuple[float, float] | np.ndarray

default_pads = RequiredPads(l=0.1, r=0.1, t=0.2, b=0.2)

def padded_rois(
  top_lefts: Annotated[np.ndarray, 'N 2'],
  size: Vec2, *, pads: Pads = {}
) -> Annotated[np.ndarray, 'N 4']:
  """Returns `l, r, t, b` coords of ROIs
  - `top_lefts`: top-left positions of each box (shape `N x 2`)
  - `size`: ROI size
  - `pads`: relative paddings (relative to `size`)
  """
  l, r, t, b = unpack(**{ **default_pads,  **pads })
  tl = top_lefts
  rois = np.zeros((tl.shape[0], 4))
  rois[:, 0] = tl[:, 0] - l * size[0]
  rois[:, 1] = tl[:, 0] + (1 + r) * size[0]
  rois[:, 2] = tl[:, 1] - t * size[1]
  rois[:, 3] = tl[:, 1] + (1 + b) * size[1]
  return np.round(rois).astype(int).clip(0)

def extract_boxes(img: np.ndarray, model: Model, *, tl: Vec2, size: Vec2, pads: Pads = {}) -> list[np.ndarray]:
  h, w = img.shape[:2]
  box_positions = (np.array(model.box_positions)*size + tl) * [w, h]
  box_size = np.array(model.box_size) * [w, h] * size
  rois = padded_rois(box_positions, box_size, pads=pads)
  return [img[t:b, l:r] for l, r, t, b in rois]