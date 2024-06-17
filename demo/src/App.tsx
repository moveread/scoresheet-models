import { Button, Center, HStack, Heading, Spinner, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchModels } from "scoresheet-models"
import Display from "./ModelDisplay"
type Props = {
  models: string[]
}
function Loaded({ models }: Props) {

  return (
    <VStack h='100vh' w='100vw' align='center' justify='center'>
      <Heading h='10%'>Moveread Scoresheet Models Demo</Heading>
      <HStack h='90%' w='100%'>
        <VStack w='30%' h='100%' align='center'>
          <Heading>Available Models</Heading>
          <Text>Click to select</Text>
          {models === null
            ? <Spinner />
            : (
              <VStack>
                {models.map(m => <Button as='a' key={m} href={`.?model=${m}`}>{m}</Button>)}
              </VStack>
            )
          }
        </VStack>
        <Center w='70%' h='100%'>
          <Display />
        </Center>
      </HStack>
    </VStack>
  )
}

export function App() {

  const [models, setModels] = useState<string[]|null>(null)
  useEffect(() => { fetchModels().then(setModels) }, [])

  return models ? <Loaded models={models} /> : <Spinner />
}

export default App