// app/study-category/[slug]/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live' // 프로젝트 헬퍼 경로에 맞게 수정
import { STUDY_CATEGORY_PAGE_QUERY } from '@/sanity/lib/queries'
import { STUDY_CATEGORY_PAGE_QUERYResult } from '@/sanity/types'
import { formatDate } from '@/utils/formatDate'

type StudyListItem = {
  _id: string
  title: string
  serial: number
  slug: string // string(serial)
  publishedAt: string
  thumbnail?: string
  summary?: string
}

type StudyCategoryPageData = {
  _id: string
  title: string
  slug: string
  summary?: string
  total: number
  posts: StudyListItem[]
}

const PAGE_SIZE = 10

// export async function generateStaticParams() {
//   const cats = await sanityFetch<{ slug: string }[]>({ query: STUDY_CATEGORY_STATIC_PARAMS_QUERY })
//   return cats.map((c) => ({ slug: c.slug }))
// }

export default async function StudyCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { slug } = await params
  const page = Math.max(1, Number((await searchParams) ?? '1'))
  const offset = (page - 1) * PAGE_SIZE
  const end = offset + PAGE_SIZE
  const { data } = (await sanityFetch<typeof STUDY_CATEGORY_PAGE_QUERY>({
    query: STUDY_CATEGORY_PAGE_QUERY,
    params: { categorySlug: slug, offset, end },
  })) as { data: STUDY_CATEGORY_PAGE_QUERYResult }

  const totalPages = Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE))

  return (
    <main className="mx-auto max-w-mobile md:max-w-desktop px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{data?.title}</h1>
        {data?.summary && <p className="mt-2 text-gray-600">{data.summary}</p>}
      </header>

      {data?.studyPosts?.length ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.studyPosts.map((post: any) => (
            <li key={post._id} className="rounded-lg border p-3">
              <Link href={`/study/${post.slug}`}>
                <div className="flex gap-3">
                  {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={120}
                      height={80}
                      className="h-20 w-32 rounded object-cover"
                    />
                  ) : (
                    <div className="h-20 w-32 rounded bg-gray-100" />
                  )}
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold">
                      {post.title}
                    </h3>
                    <div className="mt-1 text-xs text-gray-500">
                      {/* {new Date(post.publishedAt).toLocaleDateString()} */}
                      {formatDate(post.createdAt, { day: true })}
                    </div>
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
        <p className="text-sm text-gray-500">아직 게시된 글이 없습니다.</p>
      )}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <nav
          className="mt-8 flex items-center justify-center gap-2"
          aria-label="Pagination"
        >
          <PaginationLink slug={slug} page={page - 1} disabled={page <= 1}>
            이전
          </PaginationLink>
          <span className="text-sm text-gray-600">
            {page} / {totalPages}
          </span>
          <PaginationLink
            slug={slug}
            page={page + 1}
            disabled={page >= totalPages}
          >
            다음
          </PaginationLink>
        </nav>
      )}
    </main>
  )
}

function PaginationLink({
  slug,
  page,
  disabled,
  children,
}: {
  slug: string
  page: number
  disabled?: boolean
  children: React.ReactNode
}) {
  if (disabled || page < 1) {
    return (
      <span className="cursor-not-allowed rounded border px-3 py-1 text-gray-400">
        {children}
      </span>
    )
  }
  return (
    <Link
      href={`/study-category/${slug}?page=${page}`}
      className="rounded border px-3 py-1 hover:bg-gray-50"
    >
      {children}
    </Link>
  )
}
