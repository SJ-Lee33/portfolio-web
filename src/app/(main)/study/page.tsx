import { sanityFetch } from '@/sanity/lib/live'
import { STUDY_LIST_QUERY } from '@/sanity/lib/queries'
import Link from 'next/link'

export const revalidate = 60

export default async function Page() {
  const { data } = await sanityFetch({ query: STUDY_LIST_QUERY })
  return (
    <main className="container mx-auto p-12 space-y-4">
      <h1 className="text-3xl font-bold">Studies</h1>
      <ul className="list-disc pl-6">
        {(data ?? []).map((d: { slug: string }) => (
          <li key={d.slug}>
            <Link href={`/study/${d.slug}`}>study/{d.slug}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
