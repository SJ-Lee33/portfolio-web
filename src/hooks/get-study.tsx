import { sanityFetch } from '@/sanity/lib/live'
import {
  STUDY_CATEGORY_AND_RECENT_QUERY,
  STUDY_NEIGHBORS_QUERY,
  STUDY_QUERY,
} from '@/sanity/lib/queries'
import {
  STUDY_CATEGORY_AND_RECENT_QUERYResult,
  STUDY_NEIGHBORS_QUERYResult,
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

export async function getStudyNeighbors(slug: string) {
  // 위아래 2개의 스터디 목록
  const sStr = slug.trim()
  const parsed = Number(sStr)
  const sNum = Number.isFinite(parsed) ? parsed : -1

  const { data: neighbors } = await sanityFetch<typeof STUDY_NEIGHBORS_QUERY>({
    query: STUDY_NEIGHBORS_QUERY,
    params: { sStr, sNum },
  })

  if (!neighbors) notFound()

  return neighbors
}

export async function getStudyCategoryAndRecent() {
  const { data } = (await sanityFetch<typeof STUDY_CATEGORY_AND_RECENT_QUERY>({
    query: STUDY_CATEGORY_AND_RECENT_QUERY,
  })) as { data: STUDY_CATEGORY_AND_RECENT_QUERYResult }
  if (!data) notFound()

  return data
}
