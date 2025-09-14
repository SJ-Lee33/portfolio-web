'use client'

import { CodeBlock, dracula } from 'react-code-blocks'

export default function ProjectCodebox({
  code,
  language,
}: {
  code: string
  language?: string
}) {
  return (
    <CodeBlock text={code} language={language || 'plaintext'} theme={dracula} />
  )
}
