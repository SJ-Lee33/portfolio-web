import 'katex/dist/katex.min.css'
import katex from 'katex'

export default function PortableMath({
  value,
}: {
  value: {
    tex?: string
    latex?: string
    mathml?: string
    display?: 'inline' | 'block'
  }
}) {
  const Tag = value.display === 'block' ? 'div' : 'span'
  const tex = value.tex ?? value.latex ?? ''
  const mathml = value.mathml ?? ''

  // MathML이면 그대로 삽입
  if (mathml.trim().startsWith('<math')) {
    return <Tag dangerouslySetInnerHTML={{ __html: mathml }} />
  }

  // 아니면 TeX → KaTeX
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: value.display === 'block',
  })
  return (
    <Tag
      dangerouslySetInnerHTML={{ __html: html }}
      className="px-4 py-1 md:px-10"
    />
  )
}
