import React from 'react'
import { Button, IconButton, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa'
import { Context, ctl } from './controller.js'
import { NumberField } from './NumberField.js'

function deleteCol(i: number, { setModel, reset }: Context) {
  setModel(m => {
    const columns = [...m.columns]
    columns.splice(i, 1)
    return { ...m, columns }
  })
  reset()
}

type ColProps = {
  col: number
  width: number
}
function ColEditor({ col, width }: ColProps) {
  const ctx = ctl.use()
  const { setModel, reset } = ctx

  function onChange(width: number) {
    if (0 < width && width <= 1) {
      setModel(m => {
        const columns = [...m.columns]
        columns[col] = width
        return { ...m, columns }
      })
      reset()
    }
  }

  return (
    <InputGroup w='fit-content'>
      <NumberField initialValue={width} onUpdate={onChange} stepper={false} min={0} max={1} step={0.01} />
      <InputRightElement>
        <IconButton
          aria-label='Delete'
          icon={<FaTimesCircle />}
          onClick={() => deleteCol(col, ctx)}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export function ColsEditor() {
  const ctx = ctl.use()
  const { reset, model, setModel } = ctx

  function newBlock() {
    setModel(m => ({ ...m, columns: [...m.columns, null] }))
    reset()
  }

  function newSpace() {
    setModel(m => ({ ...m, columns: [...m.columns, 0.05] }))
    reset()
  }

  return (
    <>
      {model.columns.map((col, i) => (
        col === null
          ? <Button key={i} rightIcon={<FaTimesCircle />} onClick={() => deleteCol(i, ctx)}>Block</Button>
          : <ColEditor key={i} col={i} width={col} />
      ))}
      <Button rightIcon={<FaPlusCircle />} variant='outline' onClick={() => newBlock()}>Block</Button>
      <Button rightIcon={<FaPlusCircle />} variant='outline' onClick={() => newSpace()}>Space</Button>
    </>
  )
}