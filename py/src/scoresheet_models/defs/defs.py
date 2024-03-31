Vec2 = tuple[float, float]

def column_offsets(cols: list[float|None], box_width: float) -> list[float]:
  offsets = []
  for c in cols:
    offsets.extend([box_width, box_width] if c is None else [c])
  return offsets

def num_blocks(cols: list[float|None]) -> int:
  return len([x for x in cols if x is None])

def block_cols(cols: list[float|None], box_width: float) -> list[float]:
  """x-positions of block cols (relative to the grid width being 1)"""
  xs = []
  dx = 0
  for c in cols:
    if c is None:
      xs.append(dx)
      dx += 2*box_width
    else:
      dx += c
  return xs

def box_positions(block_cols: list[float], rows: int, box_width: float) -> list[Vec2]:
  ps: list[Vec2] = []
  for c in block_cols:
    for i in range(rows):
      r = i/rows
      ps.append([c, r])
      ps.append([c+box_width, r])
  return ps

def box_size(rows: int, box_width: float) -> Vec2:
    """Box size normalized to the grid being `(1, 1)`"""
    return box_width, 1/rows