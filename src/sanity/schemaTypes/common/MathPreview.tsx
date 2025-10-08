// src/sanity/components/MathPreview.tsx
import React from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default function MathPreview({
  tex = '',
  display = 'inline',
}: {
  tex?: string
  display?: 'inline' | 'block'
}) {
  const __html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: display === 'block',
  })
  return <div dangerouslySetInnerHTML={{ __html }} />
}
