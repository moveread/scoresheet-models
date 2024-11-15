import { columnOffsets, range } from './defs.js';
export function rowLines(rows) {
    return range(rows + 1).map(r => r / rows);
}
export function columnLines(model) {
    let dx = 0;
    const xs = [];
    for (const offset of columnOffsets(model)) {
        xs.push(dx);
        dx += offset;
    }
    xs.push(1);
    return xs;
}
export function grid(model) {
    return {
        rows: rowLines(model.rows),
        cols: columnLines(model)
    };
}
