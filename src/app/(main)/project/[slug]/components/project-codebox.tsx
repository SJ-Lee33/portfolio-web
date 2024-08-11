'use client'
import { CopyBlock, atomOneDark } from 'react-code-blocks'

export default function ProjectCodebox({
  value,
}: {
  value: { code: string; language: string }
}) {
  return (
    <div className="px-4 md:px-10 text-body-m my-3">
      <CopyBlock
        text={value.code}
        language={value.language}
        theme={atomOneDark}
        showLineNumbers
        codeBlock
      />
    </div>
  )
}
