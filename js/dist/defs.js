export function columnOffsets({ columns, boxWidth }) {
    return columns.map(c => c === null ? boxWidth : c);
}
/** Box X positions (relative to 1) */
export function boxXs({ columns, boxWidth }) {
    const xs = [];
    let dx = 0;
    for (const c of columns) {
        if (c === null) {
            xs.push(dx);
            dx += boxWidth;
        }
        else
            dx += c;
    }
    return xs;
}
/** Box size normalized to the grid being `(1, 1)` */
export function boxSize({ rows, boxWidth }) {
    return [boxWidth, 1 / rows];
}
export const range = (n) => new Array(n).fill(0).map((_, i) => i);
function pairsiwe(xs) {
    const n = xs.length;
    const ps = [];
    for (const i of range(n - 1))
        ps.push([xs[i], xs[i + 1]]);
    return ps;
}
export function boxPositions(model) {
    const ps = [];
    for (const [x1, x2] of pairsiwe(boxXs(model))) {
        for (const i of range(model.rows)) {
            const r = i / model.rows;
            ps.push([x1, r], [x2, r]);
        }
    }
    return ps;
}
