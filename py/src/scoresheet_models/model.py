from typing import Sequence
from functools import cached_property
from pydantic import BaseModel
import numpy as np
from .defs import Vec2, block_cols, box_positions, column_offsets

class Model(BaseModel):
  boxWidth: float
  """Box Width relative to 1"""
  rows: int
  """Number of rows"""
  columns: Sequence[float|None]
  """Columns offsets (relative to 1), where column block are represented by `None` (they have width `2*boxWidth`)"""

  @cached_property
  def box_size(self) -> Vec2:
    """Box size normalized to the grid being `(1, 1)`"""
    return self.boxWidth, 1/self.rows
  
  @property
  def block_cols(self) -> Sequence[float]:
    """x-positions of block cols (relative to the grid width being 1)"""
    return block_cols(self.columns, self.boxWidth)

  @cached_property
  def box_positions(self) -> Sequence[Vec2]:
    return box_positions(self.block_cols, self.rows, self.boxWidth)
  
  @cached_property
  def col_offsets(self) -> Sequence[float]:
    return column_offsets(self.columns, self.boxWidth)
  
  @cached_property
  def col_positions(self) -> Sequence[float]:
    return np.cumsum([0, *self.col_offsets])
  
  @cached_property
  def row_positions(self) -> Sequence[float]:
    return [i/self.rows for i in range(self.rows+1)]
  
  @property
  def nboxes(self) -> int:
    return len(self.box_positions)
  
  @property
  def rmin(self):
    return 1 / self.rows
  
  @property
  def cmin(self):
    return min(self.col_offsets)