import { sanityFetch } from '@/sanity/lib/live'
import { RESUME_QUERY } from '@/sanity/lib/queries'
import { RESUME_QUERYResult } from '@/sanity/types'

import { notFound } from 'next/navigation'

export default async function getResume() {
  // 경력기술서 pdf파일
  const { data: resume } = (await sanityFetch<typeof RESUME_QUERY>({
    query: RESUME_QUERY,
  })) as { data: RESUME_QUERYResult }
  if (!resume) notFound()

  return resume
}
