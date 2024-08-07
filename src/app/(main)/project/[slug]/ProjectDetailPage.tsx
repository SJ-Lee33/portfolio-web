import { ProjectDTO } from '@/types/project/project-dto'
import ProjectSubtitle from './components/project-subtitle'
import ProjectSummary from './components/project-summary'
import ProjectTitle from './components/project-title'
import ProjectTypeLabel from '../../(home)/components/project-type-label'

export default async function ProjectDetailPage({
  project,
}: {
  project?: ProjectDTO
}) {
  if (!project) return <></>
  return (
    <div className="flex flex-col items-center w-full">
      {/* 분류 */}
      <div className="w-full text-center font-medium text-title-s bg-white py-2">
        <ProjectTypeLabel projectTypes={project.projectTypes} />
      </div>

      {/* 제목 (상단고정) */}
      <ProjectTitle title={project.title} />

      {/* 요약 */}
      <ProjectSummary
        contribution={project.contribution}
        duration={project.duration}
        releaseDate={project.releaseDate}
        role={project.role}
        skill={project.skill}
        thumbnail={project.thumbnail}
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <ProjectSubtitle subtitle="프로젝트 개요" />
          <div className="px-5 md:px-10">
            이벤트성 퀴즈 게임을 Unity 툴로 제작하였습니다. 사용자 경험을 개선해
            개인 SNS를 통해 배포하였으며, SNS 실시간 트렌드에 오르는 성과를
            내었고 이 경험을 바탕으로 관련 수업을 수강해 좋은 성적을 받았습니다.
          </div>
        </div>
      </div>
    </div>
  )
}
