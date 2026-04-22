import ProjectContentSection from './project-content-section'
import ProjectGallerySection from './project-gallery-section'
import ProjectLegacySection from './project-legacy-section'
import ProjectMobileNav from './project-mobile-nav'
import ProjectOverviewSection from './project-overview-section'
import ProjectResultSection from './project-result-section'
import type {
  OverviewHighlight,
  ResultMetric,
  SectionItem,
} from '@/hooks/get-project'

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-가-힣]/g, '')
}

interface Props {
  sections: SectionItem[]
  legacyContent?: any[]
  legacyImgUrls?: string[]
  overviewDesc?: string | null
  overviewHighlights?: OverviewHighlight[]
  resultOutcomes?: string[]
  resultMetrics?: ResultMetric[]
}

export default function ProjectSectionRenderer({
  sections,
  legacyContent,
  legacyImgUrls,
  overviewDesc,
  overviewHighlights,
  resultOutcomes,
  resultMetrics,
}: Props) {
  const hasOverview = (overviewHighlights?.length ?? 0) > 0 || !!overviewDesc
  const hasResult =
    (resultOutcomes?.length ?? 0) > 0 || (resultMetrics?.length ?? 0) > 0

  // 새 섹션 모드 (또는 Overview/Result만 있는 경우)
  if (sections.length > 0 || hasOverview || hasResult) {
    // 모바일 nav 아이템 조립
    const navItems: { id: string; label: string }[] = []
    if (hasOverview) navItems.push({ id: 'overview', label: 'Overview' })
    sections.forEach((s) =>
      navItems.push({ id: slugify(s.title), label: s.title }),
    )
    if (hasResult) navItems.push({ id: 'result', label: 'Result' })

    return (
      <>
        {/* 모바일 탭 네비게이션 */}
        <ProjectMobileNav navItems={navItems} />

        <div className="flex flex-col gap-[80px] p-5 ">
          {/* Overview 카드 섹션 (항상 맨 위) */}
          {hasOverview && (
            <ProjectOverviewSection
              desc={overviewDesc}
              highlights={overviewHighlights ?? []}
            />
          )}

          {/* 자유 섹션들 */}
          {sections.map((section) => {
            const id = slugify(section.title)

            if (section._type === 'gallerySection') {
              return (
                <ProjectGallerySection
                  key={id}
                  id={id}
                  title={section.title}
                  images={section.images ?? []}
                />
              )
            }

            return (
              <ProjectContentSection
                key={id}
                id={id}
                title={section.title}
                body={Array.isArray(section.body) ? section.body : []}
              />
            )
          })}

          {/* Result 고정 섹션 (항상 맨 아래) */}
          {hasResult && (
            <ProjectResultSection
              outcomes={resultOutcomes ?? []}
              metrics={resultMetrics ?? []}
            />
          )}
        </div>
      </>
    )
  }

  // 레거시 fallback
  if (legacyContent && legacyContent.length > 0) {
    return (
      <ProjectLegacySection content={legacyContent} imgUrls={legacyImgUrls} />
    )
  }

  return null
}
