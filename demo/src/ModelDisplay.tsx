import { Spinner } from '@chakra-ui/react'
import { useEffect, useState, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { Model, fetchModel } from 'scoresheet-models'
const Selector = lazy(() => import('./Selector'));


export type Props = {
  modelId: string
}
function ModelDisplay({ modelId }: Props) {
  const [model, setModel] = useState<Model|null>(null)
  const src = `https://movereadcdn.blob.core.windows.net/model-images/${modelId}.jpg`

  useEffect(() => {
    setModel(null)
    fetchModel(modelId).then(setModel)
  }, [modelId])

  return model ? <Selector src={src} model={model} /> : <Spinner />
}

export function Display() {
  const { model } = useParams()
  return <ModelDisplay modelId={model!} />
}

export default Display