import 'katex/dist/katex.min.css'
import katex from 'katex'
import { Card, Stack, Text } from '@sanity/ui'
import type { ObjectInputProps } from 'sanity'

export default function MathInput(props: ObjectInputProps) {
  const tex = (props.value as any)?.tex ?? ''
  const display = (props.value as any)?.display === 'block'
  const __html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: display,
  })

  return (
    <Stack space={3}>
      {/* 기본 필드 UI(텍스트/셀렉트 등) 그대로 렌더 */}
      {props.renderDefault(props)}

      {/* 라이브 프리뷰 */}
      <Card padding={3} radius={2} shadow={1} tone="primary">
        <div dangerouslySetInnerHTML={{ __html }} />
      </Card>

      {!tex && (
        <Text size={1} muted>
          TeX 입력 시 미리보기가 표시됩니다.
        </Text>
      )}
    </Stack>
  )
}
