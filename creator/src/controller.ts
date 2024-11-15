import { contextize } from 'contextize'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { Model, grid } from 'scoresheet-models'
import { Rectangle, useGridSelector, Hook, Config } from 'use-grid-selector'

export type Context = {
  model: Model
  setModel: Dispatch<SetStateAction<Model>>
  reset(): void
  selector: Hook
  update(patch: Partial<Model>): void
}

export type Props = {
  img: string
} & Config
function useController({ img, ...props }: Props): Context {
  const [model, setModel] = useState<Model>({
    boxWidth: 0.14,
    rows: 25,
    columns: [null, null],
  })
  const template = useMemo(() => grid(model), [model])

  const [startCoords, setCoords] = useState<Rectangle>({ size: [1, 1], tl: [0, 0] })
  
  const selector = useGridSelector(img, template, {
    startCoords, ...props,
  })

  const reset = useCallback(() => {
    setCoords(selector.coords())
    setTimeout(selector.reset, 0)
  }, [selector])

  const update = useCallback((patch: Partial<Model>) => {
    setModel(m => ({ ...m, ...patch }))
    reset()
  }, [reset])

  return useMemo(() => ({ model, setModel, selector, reset, update }), [model, setModel, selector, reset, update])
}

export const ctl = contextize(useController)