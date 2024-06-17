import { range } from "@haskellian/range";
import { columnOffsets } from "./defs.js";
export function rowLines(rows) {
    return range(0, rows + 1).map(r => r / rows);
}
export function columnLines(columns, boxWidth) {
    let dx = 0;
    const xs = [];
    for (const offset of columnOffsets(columns, boxWidth)) {
        xs.push(dx);
        dx += offset;
    }
    xs.push(1);
    return xs;
}
export function grid(model) {
    return {
        rows: rowLines(model.rows),
        cols: columnLines(model.columns, model.boxWidth)
    };
}
