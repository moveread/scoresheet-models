import { Vec2 } from './util/vectors.ts'
import { range } from './util/arrays.ts'

export type Model = {
  boxWidth: number
  rows: number
  columns: Array<number|null>
}

export type Grid = {
  rows: number[]
  cols: number[]
}

export type Box = {
  /** Top-left aka translation from origin */
  t: Vec2
  /** Size aka scale */
  s: Vec2
}

/** Expanded columns offsets (including block columns). They should add up to 1. */
export function columnOffsets(columns: Array<number|null>, boxWidth: number): number[] {
  return columns.flatMap(x => x === null ? [boxWidth, boxWidth] : [x])
}


/** x-positions of block cols (relative to the grid width being 1) */
export function blockCols(columns: Array<number|null>, boxWidth: number): number[] {
  const xs: number[] = []
  let dx = 0
  for (const x of columns) {
    if (x === null) {
      xs.push(dx)
      dx += 2*boxWidth
    }
    else
      dx += x
  }
  return xs
}

export function boxPositions({ rows, columns, boxWidth }: Model): Vec2[] {
  const ps: Vec2[] = []
  for (const c of blockCols(columns, boxWidth)) {
    for (const i of range(rows)) {
      const r = i/rows
      ps.push([c, r], [c+boxWidth, r])
    }
  }
  return ps
}
