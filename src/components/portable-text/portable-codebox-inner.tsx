'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FaRegCopy, FaCheck } from 'react-icons/fa6'

export default function CodeBoxInner({
  code,
  language,
}: {
  code: string
  language?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-neutralLighter shadow-sm">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] text-body-s text-white border-b border-neutral">
        <span className="tracking-wide">{language || 'code'}</span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-white hover:text-primaryLight transition"
        >
          {copied ? (
            <>
              <FaCheck size={12} />
              copied
            </>
          ) : (
            <>
              <FaRegCopy size={12} />
              copy
            </>
          )}
        </button>
      </div>

      {/* code */}
      <SyntaxHighlighter
        language={language || 'text'}
        style={vscDarkPlus}
        showLineNumbers
        wrapLongLines
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '0.9rem',
          background: '#1e1e1e',
        }}
        lineNumberStyle={{
          color: '#6e7681',
          paddingRight: '1rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
