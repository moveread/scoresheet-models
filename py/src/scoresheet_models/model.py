from typing_extensions import Sequence, Annotated
from functools import cached_property
from itertools import pairwise
from pydantic import BaseModel
import numpy as np

Vec2 = tuple[float, float]

class Model(BaseModel):
  boxWidth: float
  """Box Width relative to 1"""
  rows: int
  """Number of rows"""
  columns: Sequence[float|None]
  """Column offsets (relative to 1), where columns are represented by `None` (with width `boxWidth`)"""

  @cached_property
  def box_size(self) -> Vec2:
    """Box size normalized to the grid being `(1, 1)`"""
    return self.boxWidth, 1/self.rows
  
  @cached_property
  def col_offsets(self) -> list[float]:
    """Column offsets (relative to 1)"""
    return [c or self.boxWidth for c in self.columns]
  
  @cached_property
  def col_positions(self) -> Annotated[np.ndarray, 'C+1']:
    """Vertical gridline positions (relative to 1)"""
    return np.cumsum([0] + self.col_offsets)

  @cached_property
  def row_positions(self) -> Annotated[np.ndarray, 'R+1']:
    """Horizontal gridline positions (relative to 1)"""
    return np.linspace(0, 1, self.rows+1)
  
  @cached_property
  def box_xs(self) -> list[float]:
    """Box X positions (relative to 1)"""
    xs = []; dx = 0
    for c in self.columns:
      if c is None:
        xs.append(dx)
        dx += self.boxWidth
      else:
        dx += c
    return xs
      
  @cached_property
  def box_positions(self) -> list[Vec2]:
    """Top left box positions (relative to 1), in order
    - Order: left to right, top to bottom within each block of 2 contiguous columns
    """
    ps = []
    for x1, x2 in pairwise(self.box_xs):
      for i in range(self.rows):
        r = i/self.rows
        ps.append((x1, r))
        ps.append((x2, r))
    return ps
        