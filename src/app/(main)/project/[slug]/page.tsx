import ProjectHeader from './components/project-header'
import ProjectSummary from './components/project-summary'
import ProjectTitle from './components/project-title'
import ProjectTypeLabel from '../../(home)/components/project-type-label'
import { PortableText } from 'next-sanity'
import ProjectPlanetext from './components/project-plaintext'
import ProjectImage from './components/project-image'
import ProjectCodebox from './components/project-codebox'
import { getProjectById } from '@/hooks/get-project-by-id'
import { LoadingSpinner } from '@/components/loading-spinner'
import ProjectListitems from './components/project-listitems'
import ProjectSubheader from './components/project-subheader'
import ProjectImages from './components/project-images'
import Link from 'next/link'
import ProjectItem from '../../(home)/components/project-item'
import NavBar from '@/components/nav-bar/nav-bar'
import ProjectContent from './components/project-content'

type Props = {
  params: {
    slug: string
  }
}

export default async function Page({ params: { slug } }: Props) {
  const project = await getProjectById(slug)
  if (!project) return <LoadingSpinner />
  const portableComponents: any = {
    block: {
      h3: ({ children }: { children: any }) => (
        <ProjectHeader>{children}</ProjectHeader>
      ),
      h4: ({ children }: { children: any }) => (
        <ProjectSubheader>{children}</ProjectSubheader>
      ),
      normal: ({ children }: { children: any }) => (
        <ProjectPlanetext>{children}</ProjectPlanetext>
      ),
    },
    listItem: {
      bullet: ({ children }: { children: any }) => (
        <ProjectListitems>{children}</ProjectListitems>
      ),
    },
    types: {
      image: ({ value }: { value: { url: string } }) => (
        <ProjectImage url={value.url} />
      ),
      code: ({ value }: { value: { code: string; language: string } }) => (
        <ProjectCodebox value={value} />
      ),
    },
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
          <ProjectTypeLabel projectTypes={project.projectTypes} />
          <div className="h-[1px] w-[40px] bg-white" />
        </div>

        {/* 제목 (상단고정) */}
        <ProjectTitle title={project.title} />

        {/* 요약 */}
        <ProjectSummary
          contribution={project.contribution}
          duration={project.duration}
          startDate={project.startDate}
          releaseDate={project.releaseDate}
          role={project.role}
          skill={project.skill}
          thumbnail={project.thumbnail}
          updatedAt={project.updatedAt}
        />

        <div className="flex flex-col px-4 py-12 md:px-[50px] lg:px-[80px] w-full">
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
                  <div key={index}>
                    {/* 타이틀 */}
                    {item.troubleShootingType == 0 ? (
                      <ProjectSubheader color="red">
                        {'💥 문제 발생! ' + item.troubleShootingTitle}
                      </ProjectSubheader>
                    ) : (
                      <ProjectSubheader color="blue">
                        {'🍀 문제 해결! ' + item.troubleShootingTitle}
                      </ProjectSubheader>
                    )}

                    {/* 내용 */}
                    <PortableText
                      value={item.troubleShootingContent}
                      components={portableComponents}
                    />
                  </div>
                )
              })}
            </>
          )}
          {/* 사진 갤러리 */}
          {project?.imageUrls && (
            <>
              <ProjectHeader>{'스크린샷'}</ProjectHeader>
              <ProjectImages
                images={project.imageUrls}
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
                      title={relatedProject.title}
                      projectTypes={relatedProject.projectTypes}
                      type={relatedProject.type}
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
