import { range } from "@haskellian/range";
/** Expanded columns offsets (including block columns). They should add up to 1. */
export function columnOffsets(columns, boxWidth) {
    return columns.flatMap(x => x === null ? [boxWidth, boxWidth] : [x]);
}
/** Number of column blocks */
export function numBlocks(columns) {
    return columns.filter(x => x === null).length;
}
/** x-positions of block cols (relative to the grid width being 1) */
export function blockCols(columns, boxWidth) {
    const xs = [];
    let dx = 0;
    for (const x of columns) {
        if (x === null) {
            xs.push(dx);
            dx += 2 * boxWidth;
        }
        else
            dx += x;
    }
    return xs;
}
/** Box size normalized to the grid being `(1, 1)` */
export function boxSize({ rows, boxWidth }) {
    return [boxWidth, 1 / rows];
}
export function boxLocation(boxIdx, rows) {
    const color = boxIdx % 2;
    const moveIdx = Math.floor(boxIdx / 2); // full-move index (independent of the color)
    const row = moveIdx % rows;
    const block = Math.floor(moveIdx / rows);
    return { color, row, block };
}
export function boxPositions({ rows, columns, boxWidth }) {
    const ps = [];
    for (const c of blockCols(columns, boxWidth)) {
        for (const i of range(0, rows)) {
            const r = i / rows;
            ps.push([c, r], [c + boxWidth, r]);
        }
    }
    return ps;
}
