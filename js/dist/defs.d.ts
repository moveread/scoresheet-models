export type Vec2 = [number, number];
export type Model = {
    /** Box Width relative to 1 */
    boxWidth: number;
    /** Number of rows */
    rows: number;
    /** Columns offsets (relative to 1), where column block are represented by `null` (they have width `2*boxWidth`) */
    columns: Array<number | null>;
};
export type Grid = {
    rows: number[];
    cols: number[];
};
export type Box = {
    /** Top-left aka translation from origin */
    t: Vec2;
    /** Size aka scale */
    s: Vec2;
};
export declare function columnOffsets({ columns, boxWidth }: Model): number[];
/** Box X positions (relative to 1) */
export declare function boxXs({ columns, boxWidth }: Model): number[];
/** Box size normalized to the grid being `(1, 1)` */
export declare function boxSize({ rows, boxWidth }: Model): Vec2;
export declare const range: (n: number) => number[];
export declare function boxPositions(model: Model): Vec2[];
