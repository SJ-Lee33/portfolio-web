import { sanityFetch } from '@/sanity/lib/live'
import { PROJECT_QUERY } from '@/sanity/lib/queries'
import type { PROJECT_QUERYResult } from '@/sanity/types'
import { getDurationDate } from '@/utils/calculateDuration'
import { enrichPortableTextWithImageUrl } from '@/utils/enrichPortableImage'
import { notFound } from 'next/navigation'

export type ProjectItem = PROJECT_QUERYResult & {
  duration: string
}
export default async function getProject(slug: string) {
  const sStr = slug.trim()
  const parsed = Number(sStr)
  const sNum = Number.isFinite(parsed) ? parsed : -1

  const { data: project } = (await sanityFetch<typeof PROJECT_QUERY>({
    query: PROJECT_QUERY,
    params: { sStr, sNum }, // 숫자/문자열 모두 대비
  })) as { data: PROJECT_QUERYResult }

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

  return {
    ...rest,
    startDate: startDate ?? '',
    releaseDate: releaseDate ?? '',
    duration,
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
