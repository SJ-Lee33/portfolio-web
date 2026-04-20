import Portable from '@/components/portable-text/portable-text-component'

interface Props {
  id: string
  title: string
  body: any[]
}

// Portable 컴포넌트: 내부 h1/h2에 자체 TOC를 생성하지 않도록
// 섹션 내부 h2는 소제목으로만 처리됨 (목차는 사이드바가 담당)

export default function ProjectContentSection({ id, title, body }: Props) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="h-px bg-gray-100 mb-6" />

      {body && body.length > 0 ? (
        <Portable value={body} hideToc />
      ) : (
        <p className="text-gray-400 text-sm italic">내용이 없습니다.</p>
      )}
    </section>
  )
}
