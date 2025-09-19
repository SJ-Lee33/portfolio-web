import { sanityFetch } from '@/sanity/lib/live'
import { STUDY_CATEGORY_AND_RECENT_QUERY } from '@/sanity/lib/queries'
import { STUDY_CATEGORY_AND_RECENT_QUERYResult } from '@/sanity/types'
import { notFound } from 'next/navigation'

export default async function getStudyCategoryAndRecent() {
  // 이력 정보
  const { data } = (await sanityFetch<typeof STUDY_CATEGORY_AND_RECENT_QUERY>({
    query: STUDY_CATEGORY_AND_RECENT_QUERY,
  })) as { data: STUDY_CATEGORY_AND_RECENT_QUERYResult }
  if (!data) notFound()

  return data
}
