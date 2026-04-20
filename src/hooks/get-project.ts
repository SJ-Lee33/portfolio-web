import { sanityFetch } from '@/sanity/lib/live'
import { PROJECT_QUERY } from '@/sanity/lib/queries'
import type { PROJECT_QUERYResult } from '@/sanity/types'
import { getDurationDate } from '@/utils/calculateDuration'
import { enrichPortableTextWithImageUrl } from '@/utils/enrichPortableImage'
import { notFound } from 'next/navigation'

// ─── 추가 타입 정의 ───────────────────────────────────────────────

export type KpiItem = {
  label: string
  value: string
  sub?: string
}

export type LinkItem = {
  label: string
  url: string
  icon: string
}

export type OverviewHighlight = {
  icon: string
  label: string
  desc: string
}

export type ResultMetric = {
  label: string
  before: number
  after: number
  unit?: string
  invert?: boolean
  color: 'blue' | 'emerald'
}

export type SectionItem = {
  _type: 'contentSection' | 'gallerySection'
  title: string
  body?: any[]
  images?: { url: string; width?: number; height?: number; caption?: string }[]
}

export type ProjectItem = PROJECT_QUERYResult & {
  duration: string | undefined
  kpis: KpiItem[]
  links: LinkItem[]
  overviewDesc?: string | null
  overviewHighlights?: OverviewHighlight[]
  resultOutcomes?: string[]
  resultMetrics?: ResultMetric[]
  sections: SectionItem[]
  imgUrls?: string[]
}

export default async function getProject(slug: string): Promise<ProjectItem> {
  const sStr = slug.trim()
  const parsed = Number(sStr)
  const sNum = Number.isFinite(parsed) ? parsed : -1

  const { data: project } = (await sanityFetch<typeof PROJECT_QUERY>({
    query: PROJECT_QUERY,
    params: { sStr, sNum },
  })) as { data: any }

  if (!project) notFound()

  const { startDate, releaseDate, troubleShootings, ...rest } = project
  const duration =
    startDate && releaseDate
      ? getDurationDate(startDate, releaseDate)
      : undefined

  const enrichedTroubleShootings = project.troubleShootings?.map(
    (item: any) => ({
      ...item,
      troubleShootingContent: enrichPortableTextWithImageUrl(
        item.troubleShootingContent,
      ),
    }),
  )

  const enrichedSections = (project.sections ?? []).map((sec: any) => {
    if (sec._type === 'contentSection' && sec.body) {
      return { ...sec, body: enrichPortableTextWithImageUrl(sec.body) }
    }
    return sec
  })

  return {
    ...rest,
    startDate: startDate ?? '',
    releaseDate: releaseDate ?? '',
    duration,
    kpis: project.kpis ?? [],
    links: project.links ?? [],
    overviewDesc: project.overviewDesc ?? null,
    overviewHighlights: project.overviewHighlights ?? [],
    resultOutcomes: project.resultOutcomes ?? [],
    resultMetrics: project.resultMetrics ?? [],
    sections: enrichedSections,
    imgUrls: project.imgUrls ?? [],
    contentOverview: enrichPortableTextWithImageUrl(
      project.contentOverview || [],
    ),
    contentContribution: enrichPortableTextWithImageUrl(
      project.contentContribution || [],
    ),
    contentSkill: enrichPortableTextWithImageUrl(project.contentSkill || []),
    contentReflection: enrichPortableTextWithImageUrl(
      project.contentReflection || [],
    ),
    troubleShootings: enrichedTroubleShootings,
  }
}
