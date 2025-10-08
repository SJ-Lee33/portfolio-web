'use client'
import { CodeBlock, github } from 'react-code-blocks'

export default function CodeBoxInner({
  code,
  language,
}: {
  code: string
  language?: string
}) {
  return (
    <CodeBlock text={code} language={language || 'plaintext'} theme={github} />
  )
}
