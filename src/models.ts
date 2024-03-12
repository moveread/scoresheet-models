import { ReifiedModel } from "./defs.js";
import { reify } from "./defs.js";

export const MODEL_IDS = ['fcde', 'llobregat23'] as const
export type ModelID = typeof MODEL_IDS[number]
export const models: Record<ModelID, ReifiedModel> = {
  fcde: reify({
   rows: 25,
   boxWidth: 0.14509394397496592,
   columns: [null, 0.02818371763906058, 0.03653445043604164, null, 0.02818371763906058, 0.03653445043604164, null]
  }),
  llobregat23: reify({
    boxWidth: 0.23350253819201386,
    rows: 30,
    columns: [null, 0.06598984723194462, null]
  })
}