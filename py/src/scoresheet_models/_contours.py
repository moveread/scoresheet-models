import numpy as np
import pure_cv as vc
from .model import Model

def bounding_boxes(model: Model) -> vc.BBoxes: # (N, 2, 2)
  top_lefts = np.array(model.box_positions) # (N, 2)
  bottom_rights = top_lefts + np.array(model.box_size) # (N, 2)
  return np.stack([top_lefts, bottom_rights], axis=-2)

def contours(model: Model, *, tl: vc.Vec2, size: vc.Vec2) -> vc.Contours:
  bboxes = (bounding_boxes(model) * size + tl)
  return vc.bbox2contour(bboxes)

def extract_boxes(img: vc.Img, model: Model, *, tl: vc.Vec2, size: vc.Vec2, pads: vc.Pads = {}):
  h, w = img.shape[:2]
  cnts = contours(model, tl=tl, size=size) * [w, h]
  return vc.extract_contours(img, cnts, **pads)