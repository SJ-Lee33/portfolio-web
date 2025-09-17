import { sanityFetch } from '@/sanity/lib/live'
import { STUDY_CATEGORY_QUERY, STUDY_LIST_QUERY } from '@/sanity/lib/queries'
import { STUDY_CATEGORY_QUERYResult } from '@/sanity/types'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

export default async function Page() {
  // const { data } = await sanityFetch({ query: STUDY_LIST_QUERY })

  const { data } = (await sanityFetch<typeof STUDY_CATEGORY_QUERY>({
    query: STUDY_CATEGORY_QUERY,
  })) as { data: STUDY_CATEGORY_QUERYResult }

  console.log(data)
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">학습 카테고리</h1>

      <div className="space-y-10">
        {data?.map((cat) => (
          <section key={cat.slug}>
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold">{cat.title}</h2>
              {/* 카테고리 전체 목록 페이지로 이동(있다면) */}
              <Link
                href={`/study/category/${cat.slug}`}
                className="text-sm underline"
              >
                더 보기
              </Link>
            </div>

            {cat.recentFivePosts.length ? (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {cat.recentFivePosts.map((post) => (
                  <li key={post._id} className="rounded-lg border p-3">
                    <Link href={`/study/${post.slug}`}>
                      <div className="flex gap-3">
                        {post.thumbnail ? (
                          <Image
                            src={post.thumbnail}
                            alt={post.title!}
                            width={96}
                            height={64}
                            className="h-16 w-24 rounded object-cover"
                          />
                        ) : (
                          <div className="h-16 w-24 rounded bg-gray-100" />
                        )}
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-medium">
                            {post.title}
                          </h3>
                          {/* <div className="mt-1 text-xs text-gray-500">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </div> */}
                          {post.summary && (
                            <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                              {post.summary}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                아직 게시된 글이 없습니다.
              </p>
            )}
          </section>
        ))}
      </div>
    </main>
  )
}
