import Image from 'next/image'
import Link from 'next/link'
import HeaderClient from '../(home)/components/header-client'
import { formatDate } from '@/utils/formatDate'
import SkillDisplay from '@/components/skill-display'
import { getStudyCategoryAndRecent } from '@/hooks/get-study'

export default async function Page() {
  const studyCategoryAndRecent = await getStudyCategoryAndRecent()

  return (
    <div>
      {/* 최상단 헤더 */}
      <header className="w-full fixed top-0 z-50">
        <HeaderClient atStudyPage />
      </header>

      {/* 본문 */}
      <div className="mt-[50px] mx-auto max-w-mobile md:max-w-desktop flex flex-col justify-center p-12 text-neutral">
        {/* 제목 */}
        <div className="text-headline-l font-extrabold my-10">학습 일지</div>

        {/* 카테고리 + 최신글 3개 */}
        <div className="flex flex-col gap-10">
          {studyCategoryAndRecent?.map((cat) => (
            <section
              key={cat.slug}
              className="flex flex-col gap-6 bg-neutralLighter p-5 border-t-[6px] border-primary"
            >
              {/* 카테고리 목록 */}
              <div className="flex w-full h-[120px] gap-5 ">
                {/* 썸네일 */}
                <div className="w-[300px] relative ">
                  <Image
                    src={cat.thumbnail}
                    alt="썸네일"
                    className="w-full object-cover shadow-md rounded-md "
                    fill
                  />
                </div>
                <div className="flex flex-col w-full justify-between">
                  {/* 스터디 카테고리 설명  */}
                  <div className="text-title-m font-bold">{cat.title}</div>
                  <div className="text-body-m text-neutral font-light mb-4">
                    {cat.summary}
                  </div>
                  <SkillDisplay skills={cat.skill!} small />
                </div>
              </div>

              {/* 구분선 */}
              <div className="h-[0.5px] w-full bg-neutral opacity-50" />

              {/* 최신 글 3개 */}
              <div>
                {cat.recentFivePosts.length ? (
                  <>
                    <div className="text-neutral font-light text-body-m mb-2">
                      ▼ 최신 게시글
                    </div>
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <>
                        {/* 글 3개, 마지막 더보기 */}
                        {cat.recentFivePosts.map((post: any) => (
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

                        {/* 더보기  */}
                        <li className="rounded p-2">
                          <Link
                            href={`/study/category/${cat.slug}`}
                            className="flex h-[200px] w-full items-center justify-center rounded bg-neutral text-white font-light hover:bg-primary hover:font-semibold"
                          >
                            더보기
                          </Link>
                        </li>
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
          ))}
        </div>
      </div>
    </div>
  )
}
