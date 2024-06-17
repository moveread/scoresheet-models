import { range } from "@haskellian/range"

export type Vec2 = [number, number]

export type Model = {
  /** Box Width relative to 1 */
  boxWidth: number
  /** Number of rows */
  rows: number
  /** Columns offsets (relative to 1), where column block are represented by `null` (they have width `2*boxWidth`) */
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

/** Number of column blocks */
export function numBlocks(columns: Array<number|null>): number {
  return columns.filter(x => x === null).length
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

/** Box size normalized to the grid being `(1, 1)` */
export function boxSize({ rows, boxWidth }: Model): Vec2 {
  return [boxWidth, 1/rows]
}

export type BoxLocation = {
  block: number
  row: number
  color: 0 | 1
}
export function boxLocation(boxIdx: number, rows: number): BoxLocation {
  const color = boxIdx % 2 as 0 | 1
  const moveIdx = Math.floor(boxIdx/2) // full-move index (independent of the color)
  const row = moveIdx % rows
  const block = Math.floor(moveIdx/rows)
  return { color, row, block }
}

export function boxPositions({ rows, columns, boxWidth }: Model): Vec2[] {
  const ps: Vec2[] = []
  for (const c of blockCols(columns, boxWidth)) {
    for (const i of range(0, rows)) {
      const r = i/rows
      ps.push([c, r], [c+boxWidth, r])
    }
  }
  return ps
}
