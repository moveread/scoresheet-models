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
/** Expanded columns offsets (including block columns). They should add up to 1. */
export declare function columnOffsets(columns: Array<number | null>, boxWidth: number): number[];
/** Number of column blocks */
export declare function numBlocks(columns: Array<number | null>): number;
/** x-positions of block cols (relative to the grid width being 1) */
export declare function blockCols(columns: Array<number | null>, boxWidth: number): number[];
/** Box size normalized to the grid being `(1, 1)` */
export declare function boxSize({ rows, boxWidth }: Model): Vec2;
export type BoxLocation = {
    block: number;
    row: number;
    color: 0 | 1;
};
export declare function boxLocation(boxIdx: number, rows: number): BoxLocation;
export declare function boxPositions({ rows, columns, boxWidth }: Model): Vec2[];
