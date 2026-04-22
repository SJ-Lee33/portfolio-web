import Portable from '@/components/portable-text/portable-text-component'
import ProjectSectionHeader from './project-section-header'

interface Props {
  id: string
  title: string
  body: any[] | null
}

// Portable 컴포넌트: 내부 h1/h2에 자체 TOC를 생성하지 않도록
// 섹션 내부 h2는 소제목으로만 처리됨 (목차는 사이드바가 담당)
export default function ProjectContentSection({ id, title, body }: Props) {
  const safeBody = Array.isArray(body) ? body : []

  return (
    <section id={id} className="scroll-mt-28">
      <ProjectSectionHeader header={title} />

      {body && body.length > 0 ? (
        <Portable value={safeBody} hideToc />
      ) : (
        <p className="italic">내용이 없습니다.</p>
      )}
    </section>
  )
}
