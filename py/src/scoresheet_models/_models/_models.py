from typing import Literal
from ..model import Model
from .andorra import ANDORRA

ModelID = Literal['fcde', 'llobregat23', 'andorra']
MODEL_IDS: list[ModelID] = ['fcde', 'llobregat23', 'andorra']
models: dict[ModelID, Model] = {
  'fcde': Model(
    boxWidth=0.14509394397496592,
    rows=25,
    columns=[None, 0.02818371763906058, 0.03653445043604164, None, 0.02818371763906058, 0.03653445043604164, None]
  ),
  'llobregat23': Model(
    boxWidth=0.23350253819201386,
    rows=30,
    columns=[None, 0.06598984723194462, None]
  ),
  'andorra': ANDORRA
}
