import ProjectHeader from './components/project-header'
import ProjectSummary from './components/project-summary'
import ProjectTitle from './components/project-title'
import ProjectTypeLabel from '../../(home)/components/project-type-label'
import ProjectImages from './components/project-images'
import Link from 'next/link'
import ProjectItem from '../../(home)/components/project-item'
import NavBar from '@/components/nav-bar/nav-bar'
import ProjectContent from './components/project-content'
import ProjectTroubleShooting from './components/project-troubleshooting'
import getProject from '@/hooks/get-project'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  return (
    <>
      <header className="w-full fixed top-0 z-50">
        <NavBar
          headerDesign="bg-white text-neutral shadow-md shadow-neutral/5"
          shownLogo
        />
      </header>

      <div className="flex flex-col items-center w-full mt-[90px] md:mt-[65px]">
        {/* 분류 */}
        <div className="flex flex-col w-full items-center text-center font-light text-body-l bg-secondary text-white pt-4 gap-4">
          <ProjectTypeLabel projectTypes={project.projectTypes} />
          <div className="h-[1px] w-[40px] bg-white" />
        </div>

        {/* 제목 (상단고정) */}
        <ProjectTitle title={project.title || ''} />

        {/* 요약 */}
        <ProjectSummary
          contribution={project.contribution || ''}
          duration={project.duration || ''}
          startDate={project.startDate || ''}
          releaseDate={project.releaseDate || ''}
          role={project.role || ''}
          skill={project.skill || []}
          thumbnail={project.thumbnail}
          updatedAt={project.updatedAt}
        />

        <div className="flex flex-col px-4 pt-12 mb-[100px] md:px-[50px] lg:px-[80px] w-full">
          {/* 내용 */}
          <ProjectContent
            overview={project.contentOverview}
            contribution={project.contentContribution}
            skill={project.contentSkill}
            reflection={project.contentReflection}
          />

          {/* 트러블슈팅 */}
          {project?.troubleShootings && (
            <>
              <ProjectHeader>{'트러블 슈팅'}</ProjectHeader>
              {project.troubleShootings.map((item: any, index: any) => {
                return (
                  <ProjectTroubleShooting
                    key={index}
                    index={index + 1}
                    title={item.troubleShootingTitle}
                    content={item.troubleShootingContent}
                  />
                )
              })}
            </>
          )}

          {/* 사진 갤러리 */}
          {project.imgUrls && (
            <>
              <ProjectHeader>{'스크린샷'}</ProjectHeader>
              <ProjectImages
                images={project.imgUrls}
                thumbnail={project.thumbnail}
              />
            </>
          )}

          {/* 관련 프로젝트  */}
          {project?.relatedProjects && (
            <>
              <ProjectHeader>{'관련 프로젝트'}</ProjectHeader>
              <div className="h-[50px]" />
              {project.relatedProjects.map((reference: any, index: number) => {
                let relatedProject = reference.reference
                return (
                  <Link
                    href={`/project/${relatedProject.id}`}
                    key={relatedProject.id}
                    target="_blank"
                    className="w-full"
                  >
                    <ProjectItem
                      id={relatedProject.id}
                      slug={relatedProject.slug}
                      title={relatedProject.title}
                      projectTypes={relatedProject.projectTypes}
                      summary={relatedProject.summary}
                      startDate={relatedProject.startDate}
                      releaseDate={relatedProject.releaseDate}
                      thumbnail={relatedProject.thumbnail}
                      skill={relatedProject?.skill}
                      index={index}
                    />
                  </Link>
                )
              })}
            </>
          )}
        </div>
      </div>
    </>
  )
}
