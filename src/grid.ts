import { Model, columnOffsets, Grid } from "./defs.ts";
import { range } from "./util/index.ts";

export function rowLines(rows: number): number[] {
  return range(rows+1).map(r => r/rows)
}

export function columnLines(columns: Array<number|null>, boxWidth: number): number[] {
  let dx = 0
  const xs: number[] = []
  for (const offset of columnOffsets(columns, boxWidth)) {
    xs.push(dx)
    dx += offset
  }
  xs.push(1)
  return xs
}

export function grid(model: Model): Grid {
  return {
    rows: rowLines(model.rows),
    cols: columnLines(model.columns, model.boxWidth)
  }
}