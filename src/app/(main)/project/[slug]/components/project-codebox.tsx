'use client'
import { CodeBlock, dracula } from 'react-code-blocks'

export default function ProjectCodebox({
  value,
}: {
  value: { code: string; language: string }
}) {
  return (
    <div className="px-4 md:px-10 text-body-m mt-2 mb-[30px] overflow-auto">
      <CodeBlock text={value.code} language={value.language} theme={dracula} />
    </div>
  )
}
