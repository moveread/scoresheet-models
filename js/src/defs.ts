import { Vec2 } from './util/vectors.js'
import { range } from './util/arrays.js'

export type Model = {
  /** Box Width relative to 1 */
  boxWidth: number
  /** Number of rows */
  rows: number
  /** Columns offsets (relative to 1), where column block are represented by `null` (they have width `2*boxWidth`) */
  columns: Array<number|null>
} & Partial<DerivedProperties>

export type DerivedProperties = {
  columnOffsets: number[]
  blockColumns: number[]
  boxPositions: Vec2[]
}

export type ReifiedModel = Model & Required<DerivedProperties>

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

export function boxPositions({ rows, columns, boxWidth, blockColumns, boxPositions }: Model): Vec2[] {
  if (boxPositions)
    return boxPositions

  const ps: Vec2[] = []
  for (const c of blockColumns ?? blockCols(columns, boxWidth)) {
    for (const i of range(rows)) {
      const r = i/rows
      ps.push([c, r], [c+boxWidth, r])
    }
  }
  return ps
}

export function reify(model: Model): ReifiedModel {
  const blockColumns = blockCols(model.columns, model.boxWidth)
  const boxPs = boxPositions({ ...model, blockColumns })
  return {
    ...model, blockColumns, boxPositions: boxPs,
    columnOffsets: columnOffsets(model.columns, model.boxWidth)
  }
}