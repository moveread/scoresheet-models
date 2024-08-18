import { useEffect, useMemo } from 'react'
import { grid, Model } from 'scoresheet-models'
import { useGridSelector } from 'use-grid-selector'

type SelectorProps = {
  src: string
  model: Model
}

export function Selector({ src, model }: SelectorProps) {
  const templ = useMemo(() => grid(model), [model])
  const { ref, reset } = useGridSelector(src, templ)
  useEffect(() => reset(), [model])
  return <canvas ref={ref} />
}

export default Selector