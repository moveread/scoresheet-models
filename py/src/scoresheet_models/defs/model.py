from functools import cached_property
from pydantic import BaseModel
from .defs import Vec2, block_cols, box_positions

class Model(BaseModel):
  boxWidth: float
  """Box Width relative to 1"""
  rows: int
  """Number of rows"""
  columns: list[float|None]
  """Columns offsets (relative to 1), where column block are represented by `None` (they have width `2*boxWidth`)"""

  @cached_property
  def box_size(self) -> Vec2:
    """Box size normalized to the grid being `(1, 1)`"""
    return self.boxWidth, 1/self.rows
  
  @cached_property
  def block_cols(self) -> list[float]:
    """x-positions of block cols (relative to the grid width being 1)"""
    return block_cols(self.columns, self.boxWidth)

  @cached_property
  def box_positions(self) -> list[Vec2]:
    return box_positions(self.block_cols, self.rows, self.boxWidth)
  
  @property
  def num_boxes(self) -> int:
    return len(self.box_positions)