import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Model, fetchModel } from 'scoresheet-models'
import Selector from './Selector'


export type Props = {
  modelId: string
}
function ModelDisplay({ modelId }: Props) {
  const [model, setModel] = useState<Model>({ boxWidth: 0.1, columns: [], rows: 2 })
  const src = `https://movereadcdn.blob.core.windows.net/model-images/${modelId}.jpg`

  useEffect(() => {
    fetchModel(modelId).then(setModel)
  }, [modelId])

  return <Selector src={src} model={model} />
}

export function Display() {
  const [params] = useSearchParams()
  return <ModelDisplay modelId={params.get('model')!} />
}

export default Display