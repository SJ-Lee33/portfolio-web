import ProjectLabel from './components/project-label'
import ProjectSubtitle from './components/project-subtitle'
import ProjectSummary from './components/project-summary'
import ProjectTitle from './components/project-title'

export default function ProjectDetailPage({
  id,
  project,
}: {
  id: string
  project: any
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <ProjectLabel />
      <ProjectTitle />
      <ProjectSummary />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 px-5">
          <ProjectSubtitle subtitle="프로젝트 개요" />
          <div content="mx-3">
            이벤트성 퀴즈 게임을 Unity 툴로 제작하였습니다. 사용자 경험을 개선해
            개인 SNS를 통해 배포하였으며, SNS 실시간 트렌드에 오르는 성과를
            내었고 이 경험을 바탕으로 관련 수업을 수강해 좋은 성적을 받았습니다.
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5">
          <ProjectSubtitle subtitle="프로젝트 개요" />
          <div content="mx-3">
            이벤트성 퀴즈 게임을 Unity 툴로 제작하였습니다. 사용자 경험을 개선해
            개인 SNS를 통해 배포하였으며, SNS 실시간 트렌드에 오르는 성과를
            내었고 이 경험을 바탕으로 관련 수업을 수강해 좋은 성적을 받았습니다.
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5">
          <ProjectSubtitle subtitle="프로젝트 개요" />
          <div content="mx-3">
            이벤트성 퀴즈 게임을 Unity 툴로 제작하였습니다. 사용자 경험을 개선해
            개인 SNS를 통해 배포하였으며, SNS 실시간 트렌드에 오르는 성과를
            내었고 이 경험을 바탕으로 관련 수업을 수강해 좋은 성적을 받았습니다.
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5">
          <ProjectSubtitle subtitle="프로젝트 개요" />
          <div content="mx-3">
            이벤트성 퀴즈 게임을 Unity 툴로 제작하였습니다. 사용자 경험을 개선해
            개인 SNS를 통해 배포하였으며, SNS 실시간 트렌드에 오르는 성과를
            내었고 이 경험을 바탕으로 관련 수업을 수강해 좋은 성적을 받았습니다.
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5">
          <ProjectSubtitle subtitle="프로젝트 개요" />
          <div content="mx-3">
            이벤트성 퀴즈 게임을 Unity 툴로 제작하였습니다. 사용자 경험을 개선해
            개인 SNS를 통해 배포하였으며, SNS 실시간 트렌드에 오르는 성과를
            내었고 이 경험을 바탕으로 관련 수업을 수강해 좋은 성적을 받았습니다.
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5">
          <ProjectSubtitle subtitle="프로젝트 개요" />
          <div content="mx-3">
            이벤트성 퀴즈 게임을 Unity 툴로 제작하였습니다. 사용자 경험을 개선해
            개인 SNS를 통해 배포하였으며, SNS 실시간 트렌드에 오르는 성과를
            내었고 이 경험을 바탕으로 관련 수업을 수강해 좋은 성적을 받았습니다.
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5">
          <ProjectSubtitle subtitle="프로젝트 개요" />
          <div content="mx-3">
            이벤트성 퀴즈 게임을 Unity 툴로 제작하였습니다. 사용자 경험을 개선해
            개인 SNS를 통해 배포하였으며, SNS 실시간 트렌드에 오르는 성과를
            내었고 이 경험을 바탕으로 관련 수업을 수강해 좋은 성적을 받았습니다.
          </div>
        </div>
      </div>
    </div>
  )
}
