import { Model, Grid } from "./defs.js";
export declare function rowLines(rows: number): number[];
export declare function columnLines(columns: Array<number | null>, boxWidth: number): number[];
export declare function grid(model: Model): Grid;
