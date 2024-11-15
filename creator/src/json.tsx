import React, { useMemo } from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'
import { ctl } from './controller.js'


export function JsonView(props: Partial<Parameters<typeof CopyBlock>[0]>) {
  const { model } = ctl.use()
  const json = useMemo(() => JSON.stringify(model, null, 2), [model])
  return <CopyBlock
    text={json} language='json' showLineNumbers={false} theme={dracula}
    customStyle={{ padding: '2rem' }} {...props}
  />
}