import { RESUME_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'

import { notFound } from 'next/navigation'

export default async function getResume() {
  // 경력기술서 pdf파일
  const resume = await client.fetch(
    RESUME_QUERY,
    {},
    {
      cache: 'no-store',
    },
  )

  if (!resume) notFound()

  return resume
}
