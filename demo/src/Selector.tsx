import { grid, Model } from 'scoresheet-models'
import { useGridSelector } from 'use-grid-selector'

type SelectorProps = {
  src: string
  model: Model
}

export function Selector({ src, model }: SelectorProps) {
  const { ref } = useGridSelector(src, grid(model))
  return <canvas ref={ref} />
}

export default Selector