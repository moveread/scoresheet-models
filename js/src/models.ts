import { ReifiedModel } from "./defs.js";
import { reify } from "./defs.js";

export const MODEL_IDS = ['fcde', 'llobregat23', 'andorra'] as const
export type ModelID = typeof MODEL_IDS[number]
export const models: Record<ModelID, ReifiedModel> = {
  fcde: reify(FCDE()),
  llobregat23: reify(LLOBREGAT23()),
  andorra: reify(ANDORRA())
}

function FCDE() {
  const SPACE_W = 0.02818371763906058
  const NUM_W = 0.03653445043604164
  return {
    rows: 25,
    boxWidth: 0.14509394397496592,
    columns: [null, SPACE_W, NUM_W, null, SPACE_W, NUM_W, null]
  }
}

function LLOBREGAT23() {
  const NUM_W = 0.06598984723194462
  return {
    boxWidth: 0.23350253819201386,
    rows: 30,
    columns: [null, NUM_W, null]
  }
}

function ANDORRA() {
  const SPACE_W = 0.01904761904761905
  const NUM_W = 0.05238095238095238
  return {
    boxWidth: 0.14285714285714285,
    rows: 20,
    columns: [null, SPACE_W, NUM_W, null, SPACE_W, NUM_W, null]
  }
}