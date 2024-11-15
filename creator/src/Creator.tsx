import React from 'react'
import { Box, Button, InputGroup, InputLeftAddon, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { ctl } from './controller.js'
import { ColsEditor } from './cols.js'
import { NumberField } from './NumberField.js'

export type CanvasProps = {
  height?: string | number
  width?: string | number
} & Parameters<typeof Box>[0]

export function Canvas({ height, width, ...props }: CanvasProps) {
  const { selector } = ctl.use()
  return (
    <Box h='100%' w='100%' {...props}>
      <canvas height={height ?? '100%'} width={width ?? '100%'} ref={selector.ref} />
    </Box>
  )
}

export function Reset() {
  const { reset } = ctl.use()
  return <Button onClick={reset}>Reset</Button>
}

export function BoxEditor(props: Partial<Parameters<typeof NumberField>[0]>) {
  const { model, update } = ctl.use()
  function onUpdate(boxWidth: number) {
    if (0 < boxWidth && boxWidth <= 1)
      update({ boxWidth })
  }

  return <NumberField initialValue={model.boxWidth} onUpdate={onUpdate} min={0} max={1} step={0.01} {...props} />
}

export function RowsEditor(props: Partial<Parameters<typeof NumberField>[0]>) {
  const { model, update } = ctl.use()
  function onUpdate(rows: number) {
    if (rows > 0 && Number.isInteger(rows))
      update({ rows })
  }

  return <NumberField initialValue={model.rows} onUpdate={onUpdate} min={0} step={1} {...props} />
}

export function VertEditor(props: Parameters<typeof VStack>[0]) {
  return (
    <VStack {...props}>
      <InputGroup>
        <InputLeftAddon>Box Width</InputLeftAddon>
        <BoxEditor fieldProps={{ borderLeftRadius: 0 }} />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Num. Rows</InputLeftAddon>
        <RowsEditor fieldProps={{ borderLeftRadius: 0 }} />
      </InputGroup>
      <Text w='100%' pt='0.4rem' pl='1rem'>Columns:</Text>
      <SimpleGrid columns={2} gap='0.4rem'>
        <ColsEditor />
      </SimpleGrid>
      <Reset />
    </VStack>
  )
}


export const Creator = Object.assign(ctl.Provider, { Canvas, BoxEditor, RowsEditor, ColsEditor, Reset, VertEditor })
export default Creator