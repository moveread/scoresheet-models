import * as fcde from './images/fcde/index.js'
import * as llobregat23 from './images/llobregat23/index.js'

import { ModelID } from "./models.js";

export type ImgSize = 's' | 'm' | 'l' | 'xl'

export const images: Record<ModelID, Record<ImgSize, string>> = {
  fcde, llobregat23
}