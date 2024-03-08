import { ReifiedModel } from "./defs.ts";
import { reify } from "./defs.ts";

export type ModelID = 'fcde'
export const models: Record<ModelID, ReifiedModel> = {
  fcde: reify({
   rows: 25,
   boxWidth: 0.14509394397496592,
   columns: [null, 0.02818371763906058, 0.03653445043604164, null, 0.02818371763906058, 0.03653445043604164, null]
  })
}
