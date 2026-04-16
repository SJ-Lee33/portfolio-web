import NavBar from '@/components/nav-bar/nav-bar'
import getProject from '@/hooks/get-project'
import ProjectTypeLabel from '../../(home)/components/project-type-label'
import ProjectTitle from './components/project-title'
import ProjectSummary from './components/project-summary'
import PortableHeader from '@/components/portable-text/portable-header'
import PortableImages from '@/components/portable-text/portable-images'
import Portable from '@/components/portable-text/portable-text-component'
import Link from 'next/link'
import ProjectItem from '../../(home)/components/project-item'
import { redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project?.isPublic) {
    redirect('/private-warning')
  }
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
          <ProjectTypeLabel projectTypes={project?.projectTypes} />
          <div className="h-[1px] w-[40px] bg-white" />
        </div>
        {/* 제목 (상단고정) */}
        <ProjectTitle title={project.title || ''} />
        {/* 본문 */}
        <div className="mx-auto max-w-mobile md:max-w-desktop">
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

          {/* 구분선 */}
          <div className="w-full h-[0.5px] bg-neutralLight my-10" />

          <div className="flex flex-col">
            {/* 내용 */}
            <Portable value={project.content!} />

            {/* 사진 갤러리 */}
            {project.imgUrls && (
              <>
                <PortableHeader>{'스크린샷'}</PortableHeader>
                <PortableImages
                  images={project.imgUrls}
                  thumbnail={project.thumbnail}
                />
              </>
            )}

            {/* 관련 프로젝트  */}
            {project?.relatedProjects && (
              <>
                <PortableHeader>{'관련 프로젝트'}</PortableHeader>
                <div className="h-[20px]" />
                {project.relatedProjects.map(
                  (reference: any, index: number) => {
                    let relatedProject = reference.reference
                    return (
                      <Link
                        href={`/project/${relatedProject.serial}`}
                        key={relatedProject.serial}
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
                  },
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
