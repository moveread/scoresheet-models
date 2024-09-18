import numpy as np
import pure_cv as vc
from .model import Model

def draw(
  img: vc.Img, model: Model, *,
  s: np.ndarray, t: np.ndarray,
  thickness: int = 3, color: int | tuple[int, int, int] = (255, 0, 0)
):
  """Draws the `model`'s grid onto `img`
  - `s`: scale
  - `t`: translation
  """
  h, w = img.shape[:2]
  s = s * [w, h]
  t = t * [w, h]
  cols = s[0]*np.array(model.col_positions) + t[0]
  rows = s[1]*np.array(model.row_positions) + t[1]

  hlines = np.array([[[t[0], y, s[0] + t[0], y]] for y in rows], dtype=np.int32)
  vlines = np.array([[[x, t[1], x, s[1] + t[1]]] for x in cols], dtype=np.int32)
  
  return vc.draw.lines(img, np.concatenate([hlines, vlines]), thickness=thickness, color=color)