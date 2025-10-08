// app/study-category/[slug]/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live' // 프로젝트 헬퍼 경로에 맞게 수정
import { STUDY_CATEGORY_PAGE_QUERY } from '@/sanity/lib/queries'
import { STUDY_CATEGORY_PAGE_QUERYResult } from '@/sanity/types'
import { formatDate } from '@/utils/formatDate'
import { getAllStudyInCategory } from '@/hooks/get-study'
import HeaderClient from '@/app/(main)/(home)/components/header-client'
import SkillDisplay from '@/components/skill-display'

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
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await getAllStudyInCategory(slug)

  return (
    <div>
      {/* 최상단 헤더 */}
      <header className="w-full fixed top-0 z-50">
        <HeaderClient atStudyPage />
      </header>

      {/* 본문 */}
      <div className="my-[50px] mx-auto max-w-mobile md:max-w-desktop flex flex-col justify-center p-12 text-neutral">
        {/* 제목 */}
        <div className="text-headline-l font-extrabold my-10">
          학습 일지 <span className="font-light">- {data.title} </span>
        </div>

        {/* 카테고리의 모든 글*/}
        <section className="flex flex-col gap-6 bg-neutralLighter p-5 border-t-[6px] border-primary">
          {/* 카테고리 이름 */}
          <div className="flex w-full h-[120px] gap-5 ">
            {/* 썸네일 */}
            <div className="w-[300px] relative ">
              <Image
                src={data.thumbnail}
                alt="썸네일"
                className="w-full object-cover shadow-md rounded-md "
                fill
              />
            </div>
            <div className="flex flex-col w-full justify-between">
              {/* 스터디 카테고리 설명  */}
              <div className="text-title-m font-bold">{data.title}</div>
              <div className="text-body-m text-neutral font-light mb-4">
                {data.summary}
              </div>
              <SkillDisplay skills={data.skill!} small />
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-[0.5px] w-full bg-neutral opacity-50" />

          {/* 최신 글 3개 */}
          <div>
            {data.studyPosts.length ? (
              <>
                <div className="text-neutral font-light text-body-m mb-2">
                  ▼ 날짜순 정렬
                </div>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <>
                    {data.studyPosts.map((post: any) => (
                      <li
                        key={post.slug}
                        className="rounded p-2 hover:bg-primary group"
                      >
                        <Link href={`/study/${post.slug}`}>
                          <div className="flex flex-col gap-3">
                            {/* 글 썸네일  */}
                            <div className="h-[200px] w-full relative">
                              <Image
                                src={post.thumbnail}
                                alt={post.title}
                                fill
                                className="object-cover rounded shadow-lg"
                              />
                            </div>

                            {/* 제목, 최근 업데이트 */}
                            <div>
                              <div className="text-body-l font-bold group-hover:text-white">
                                {post.title}
                              </div>

                              <div className="mt-1 text-body-s text-neutralLight group-hover:text-white font-light">
                                최근 수정일 :{' '}
                                {formatDate(post.updatedAt, {
                                  day: true,
                                })}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </>
                </ul>
              </>
            ) : (
              <p className="text-neutral font-light text-body-m mb-2">
                아직 게시된 글이 없습니다.
              </p>
            )}
          </div>
        </section>

        <Link href="/study" className="mt-10">
          &larr; 전체 목록 보기
        </Link>
      </div>
    </div>
  )
}
