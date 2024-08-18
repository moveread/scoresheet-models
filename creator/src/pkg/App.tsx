import { HStack, Input, InputGroup, InputLeftAddon, Textarea, VStack } from "@chakra-ui/react"
import { ChangeEvent, useMemo, useState } from "react"
import { Rectangle, useGridSelector } from "use-grid-selector"
import {range } from '@haskellian/range'
import { grid, Model } from "scoresheet-models"
import { sum } from "ramda"

export function App() {
  const [src, setSrc] = useState('')
  const [blocks, setBlocks] = useState(3)
  const [spaceWidth, setSpace] = useState<number|null>(null)
  const [numberWidth, setNumber] = useState(0.1)
  const [boxWidth, setBox] = useState(0.1)
  const [rows, setRows] = useState(30)

  const model: Model = useMemo(() => {
    const cols: [null|number] = [null]
    for (const _ of range(0, blocks-1)) {
      if (spaceWidth)
        cols.push(spaceWidth)
      cols.push(numberWidth, null)
    }
    const n = sum(cols.map(x => x ?? 2*boxWidth))
    cols.forEach((x, i) => { cols[i] = x ? x/n : x })
    console.log('Columns:', cols)
  
    return {
      boxWidth: boxWidth / n,
      rows,
      columns: cols
    }

  }, [blocks, spaceWidth, rows, numberWidth, boxWidth])

  const templ = useMemo(() => grid(model), [model])

  const [startCoords, setCoords] = useState<Rectangle|undefined>(undefined)
  const { ref, reset: reset_, coords } = useGridSelector(src, templ, { startCoords })
  function reset() {
    setCoords(coords())
    reset_()
  }

  function onUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setSrc(URL.createObjectURL(file))
      reset_()
    }
  }
  function onWidth(e: ChangeEvent<HTMLInputElement>) {
    const boxWidth = parseFloat(e.target.value)
    if (isNaN(boxWidth)) return
    setBox(boxWidth)
    reset()
  }
  function onRows(e: ChangeEvent<HTMLInputElement>) {
    const rows = parseInt(e.target.value)
    if (isNaN(rows)) return
    setRows(rows)
    reset()
  }
  function onSpace(e: ChangeEvent<HTMLInputElement>) {
    const spaceWidth = parseFloat(e.target.value)
    setSpace(isNaN(spaceWidth) ? null : spaceWidth)
    reset()
  }
  function onNumber(e: ChangeEvent<HTMLInputElement>) {
    const numberWidth = parseFloat(e.target.value)
    if (isNaN(numberWidth)) return
    setNumber(numberWidth)
    reset()
  }
  function onBlocks(e: ChangeEvent<HTMLInputElement>) {
    const blocks = parseInt(e.target.value)
    if (isNaN(blocks)) return
    setBlocks(blocks)
    reset()
  }

  return (
    <HStack h='100vh' w='100vw' align='center' justify='center'>
      <VStack h='100%' w='40%' align='start' justify='center' px='2rem'>
        <Input w='fit-content' type='file' accept='image/*' onChange={onUpload} />
        <InputGroup>
          <InputLeftAddon>Box Width</InputLeftAddon>
          <Input type='number' placeholder={`${boxWidth}`} onChange={onWidth} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>Num rows</InputLeftAddon>
          <Input type='number' placeholder={`${rows}`} onChange={onRows} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>Num blocks</InputLeftAddon>
          <Input type='number' placeholder={`${blocks}`} onChange={onBlocks} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>Space Width</InputLeftAddon>
          <Input type='number' placeholder={`${spaceWidth}`} onChange={onSpace} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>Number Width</InputLeftAddon>
          <Input type='number' placeholder={`${numberWidth}`} onChange={onNumber} />
        </InputGroup>
        <Textarea w='100%' value={JSON.stringify(model)} readOnly />
      </VStack>
      <VStack h='100%' w='60%' align='center' justify='center'>
        <canvas ref={ref} />
      </VStack>
    </HStack>
  )
}

export default App