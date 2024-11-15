import { Model, columnOffsets, Grid, range } from './defs.js'

export function rowLines(rows: number): number[] {
  return range(rows+1).map(r => r/rows)
}

export function columnLines(model: Model): number[] {
  let dx = 0
  const xs: number[] = []
  for (const offset of columnOffsets(model)) {
    xs.push(dx)
    dx += offset
  }
  xs.push(1)
  return xs
}

export function grid(model: Model): Grid {
  return {
    rows: rowLines(model.rows),
    cols: columnLines(model)
  }
}