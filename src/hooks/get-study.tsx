import { sanityFetch } from '@/sanity/lib/live'
import {
  STUDY_CATEGORY_AND_RECENT_QUERY,
  STUDY_QUERY,
} from '@/sanity/lib/queries'
import {
  STUDY_CATEGORY_AND_RECENT_QUERYResult,
  STUDY_QUERYResult,
} from '@/sanity/types'
import { notFound } from 'next/navigation'

export async function getStudy(slug: string) {
  const sStr = slug.trim()
  const parsed = Number(sStr)
  const sNum = Number.isFinite(parsed) ? parsed : -1

  const { data: post } = (await sanityFetch<typeof STUDY_QUERY>({
    query: STUDY_QUERY,
    params: { sStr, sNum }, // 숫자/문자열 모두 대비
  })) as { data: STUDY_QUERYResult }

  if (!post) notFound()

  return post
}

export async function getStudyCategoryAndRecent() {
  // 이력 정보
  const { data } = (await sanityFetch<typeof STUDY_CATEGORY_AND_RECENT_QUERY>({
    query: STUDY_CATEGORY_AND_RECENT_QUERY,
  })) as { data: STUDY_CATEGORY_AND_RECENT_QUERYResult }
  if (!data) notFound()

  return data
}
