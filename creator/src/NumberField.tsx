import React, { useState } from 'react'
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'


export type Props = {
  initialValue: number
  onUpdate(value: number): void
  stepper?: boolean
  fieldProps?: Partial<Parameters<typeof NumberInputField>[0]>
} & Partial<Parameters<typeof NumberInput>[0]>

export function NumberField({ onUpdate, initialValue, stepper, fieldProps, ...props }: Props) {
  const [value, setValue] = useState(`${initialValue}`)

  function onChange(value: string, num: number) {
    setValue(value)
    if (!isNaN(num))
      onUpdate(num)
  }


  return (
    <NumberInput value={value} keepWithinRange={false} onChange={onChange} {...props}>
      <NumberInputField w={`${0.5*value.length + 4}rem`} {...fieldProps} />
      {(stepper ?? true) && (<NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>)}
    </NumberInput>
  )
}