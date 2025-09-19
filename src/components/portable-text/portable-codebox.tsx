'use client'
import dynamic from 'next/dynamic'

// 클라에서만 로드
const CodeBoxInner = dynamic(() => import('./portable-codebox-inner'), {
  ssr: false,
  loading: () => (
    <pre className="rounded-md p-3 overflow-x-auto text-sm bg-neutral-50 text-neutral-700">
      <code />
    </pre>
  ),
})

export default function PortableCodebox({
  code,
  language,
}: {
  code: string
  language?: string
}) {
  return <CodeBoxInner code={code} language={language} />
}
