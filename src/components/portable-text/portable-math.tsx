import 'katex/dist/katex.min.css'
import katex from 'katex'

export default function PortableMath({
  value,
}: {
  value: {
    tex?: string
    latex?: string
    mathml?: string
  }
}) {
  const Tag = 'div'
  const tex = value.tex ?? value.latex ?? ''
  const mathml = value.mathml ?? ''

  // MathML이면 그대로 삽입
  if (mathml.trim().startsWith('<math')) {
    return <Tag dangerouslySetInnerHTML={{ __html: mathml }} />
  }

  // 아니면 TeX → KaTeX
  const html = katex.renderToString(tex, {
    throwOnError: false,
  })

  return (
    <Tag
      dangerouslySetInnerHTML={{ __html: html }}
      className="px-4 py-3 md:px-10"
    />
  )
}
