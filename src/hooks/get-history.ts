import { sanityFetch } from '@/sanity/lib/live'
import { HISTORY_QUERY } from '@/sanity/lib/queries'
import type { HISTORY_QUERYResult } from '@/sanity/types'

import { notFound } from 'next/navigation'

export default async function getHistory() {
  // 이력 정보
  const { data: history } = (await sanityFetch<typeof HISTORY_QUERY>({
    query: HISTORY_QUERY,
  })) as { data: HISTORY_QUERYResult }
  if (!history) notFound()

  return history
}
