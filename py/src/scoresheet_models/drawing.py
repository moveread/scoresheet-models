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
  cols = s[0]*np.array(model.col_positions) + t[0]
  rows = s[1]*np.array(model.row_positions) + t[1]
  out = vc.draw.vlines(img, cols, thickness=thickness, color=color)
  return vc.draw.hlines(out, rows, thickness=thickness, color=color)