import { redirect } from 'next/navigation'
import getProject from '@/hooks/get-project'
import ProjectHero from './components/project-hero'
import ProjectSidebar from './components/project-sidebar'
import NavBar from '@/components/nav-bar/nav-bar'
import ProjectSectionRenderer from './components/project-section-renderer'
import ProjectRelated from './components/project-related'

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

  // const year = project.startDate ? project.startDate.slice(0, 4) : ''
  const sections = project.sections ?? []
  const hasNewSections = sections.length > 0
  const hasLegacyContent =
    !hasNewSections &&
    Array.isArray(project.content) &&
    project.content.length > 0

  const hasOverview =
    (project.overviewHighlights?.length ?? 0) > 0 || !!project.overviewDesc
  const hasResult =
    (project.resultOutcomes?.length ?? 0) > 0 ||
    (project.resultMetrics?.length ?? 0) > 0

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* 상단 고정 헤더 */}
      <header className="w-full fixed top-0 z-50">
        <NavBar
          headerDesign="bg-white text-neutral shadow-sm border-b border-gray-100"
          shownLogo
        />
      </header>

      {/* Hero — 흰 배경, 아래 그림자 */}
      <div className="pt-[65px] bg-white shadow-xl shadow-neutralLight/20">
        <ProjectHero project={project} />
      </div>

      {/* 본문 영역 */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 py-10 md:py-14 bg-neutralLight/5">
        <div className="flex gap-10 md:gap-14 items-start">
          {/* 사이드바 (TOC) */}
          <ProjectSidebar
            sections={sections}
            hasLegacy={hasLegacyContent ?? false}
            hasOverview={hasOverview}
            hasResult={hasResult}
          />

          {/* 본문 섹션들 */}
          <main className="flex-1 min-w-0 space-y-20 ">
            <ProjectSectionRenderer
              sections={sections}
              legacyContent={
                hasLegacyContent && Array.isArray(project.content)
                  ? project.content
                  : undefined
              }
              legacyImgUrls={hasLegacyContent ? project.imgUrls : undefined}
              overviewDesc={project.overviewDesc}
              overviewHighlights={project.overviewHighlights}
              resultOutcomes={project.resultOutcomes}
              resultMetrics={project.resultMetrics}
            />

            {/* 관련 프로젝트 */}
            {project.relatedProjects && project.relatedProjects.length > 0 && (
              <ProjectRelated relatedProjects={project.relatedProjects} />
            )}

            {/* 최하단 제목 */}
            <div className="pb-20 border-t border-neutral/10 pt-10">
              <p className="text-body-s text-neutral/60 font-medium">
                {project.title} · Portfolio · Sojin Lee
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
