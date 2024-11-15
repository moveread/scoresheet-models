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

export function columnOffsets({ columns, boxWidth }: Model): number[] {
  return columns.map(c => c === null ? boxWidth : c)
}

/** Box X positions (relative to 1) */
export function boxXs({ columns, boxWidth }: Model): number[] {
  const xs: number[] = []
  let dx = 0

  for (const c of columns) {
    if (c === null) {
      xs.push(dx)
      dx += boxWidth
    }
    else
      dx += c
  }

  return xs
}


/** Box size normalized to the grid being `(1, 1)` */
export function boxSize({ rows, boxWidth }: Model): Vec2 {
  return [boxWidth, 1/rows]
}

export const range = (n: number) => new Array(n).fill(0).map((_, i) => i)

function pairsiwe<T>(xs: T[]): [T, T][] {
  const n = xs.length
  const ps: [T, T][] = []
  for (const i of range(n-1))
    ps.push([xs[i], xs[i+1]])
  return ps
}

export function boxPositions(model: Model): Vec2[] {
  const ps: Vec2[] = []
  for (const [x1, x2] of pairsiwe(boxXs(model))) {
    for (const i of range(model.rows)) {
      const r = i/model.rows
      ps.push([x1, r], [x2, r])
    }
  }
  return ps
}
