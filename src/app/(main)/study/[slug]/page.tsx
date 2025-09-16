import { sanityFetch } from '@/sanity/lib/live'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { STUDY_QUERY } from '@/sanity/lib/queries'
import { STUDY_QUERYResult } from '@/sanity/types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 60

export default async function Page({ params }: { params: { slug: string } }) {
  const sStr = params.slug.trim()
  const parsed = Number(sStr)
  const sNum = Number.isFinite(parsed) ? parsed : -1

  const { data: post } = (await sanityFetch<typeof STUDY_QUERY>({
    query: STUDY_QUERY,
    params: { sStr, sNum }, // 숫자/문자열 모두 대비
  })) as { data: STUDY_QUERYResult }

  if (!post) notFound()

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="text-sm text-zinc-500">Serial: {post.serial}</p>
      <hr />
      <Image
        className="w-full aspect-[800/300]"
        src={urlFor(post.thumbnail)
          .width(800)
          .height(300)
          .quality(80)
          .auto('format')
          .url()}
        alt=""
        width="800"
        height="300"
      />
      <Link href="/study">&larr; Return to index</Link>
    </main>
  )
}
