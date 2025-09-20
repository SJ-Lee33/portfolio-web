import Link from 'next/link'
import Portable from '@/components/portable-text/portable-text-component'
import { getStudy, getStudyNeighbors } from '@/hooks/get-study'
import NavBar from '@/components/nav-bar/nav-bar'
import ProjectTitle from '../../project/[slug]/components/project-title'
import { formatDate } from '@/utils/formatDate'
import { BsFillCaretRightFill } from 'react-icons/bs'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = await getStudy(slug)
  const neighbors = await getStudyNeighbors(slug)

  type NeighborsType = {
    title: string
    date: string
    slug: string
    current?: boolean
  }
  const prevNeighborList = (neighbors?.prev ?? []) as NeighborsType[]
  const nextNeighbortList = (neighbors?.next ?? []) as NeighborsType[]

  const Neighbor = ({ title, date, slug, current }: NeighborsType) => {
    return (
      <li key={slug} className="py-2 first:pt-0 last:pb-0 flex group">
        <Link
          href={`/study/${slug}`}
          className="flex justify-center items-center"
        >
          <div
            className={`flex items-center text-body-s pl-3 ml-3 mr-3 group-hover:underline group-hover:text-primary ${current && 'text-primaryDark underline ml-0'}`}
          >
            {current && <BsFillCaretRightFill />}
            {title}
          </div>
          <span
            className={`text-caption text-neutralLight font-light ${current && 'text-primaryDark'}`}
          >
            {date ? formatDate(date, { day: true }) : ''}
          </span>
        </Link>
      </li>
    )
  }
  return (
    <>
      <header className="w-full fixed top-0 z-50">
        <NavBar
          headerDesign="bg-white text-neutral shadow-md shadow-neutral/5"
          shownLogo
        />
      </header>

      <div className="flex flex-col items-center w-full mt-[90px] md:mt-[65px]">
        {/* 제목 (상단고정) */}
        <ProjectTitle title={study.title || ''} />
      </div>

      {/* 본문 */}
      <div className="mx-auto max-w-mobile md:max-w-desktop">
        {/* 내용 */}
        <Portable value={study.body!} />

        {/* 같은 카테고리의 다른 글 */}
        {(prevNeighborList.length > 0 || nextNeighbortList.length > 0) && (
          <section className="my-[70px] border-t-[2px] border-neutralLight">
            <div className="text-body-l text-neutralLight mt-[50px]">
              <Link
                href={`/study/category/${study.categorySlug}`}
                className="font-semibold underline hover:text-primary"
              >
                {study.categoryTitle}
              </Link>{' '}
              카테고리의 다른 글
            </div>

            {/* 내 글 기준 위(다음글) 2개, 아래(이전글) 2개 */}
            <ul className="flex flex-col my-3 divide-y-[0.5px] divide-neutralLight">
              {/* 위쪽(다음 글) 최대 2개 */}
              {nextNeighbortList.length && (
                <>
                  {nextNeighbortList.map((next) => (
                    <Neighbor
                      key={next.slug}
                      title={next.title}
                      slug={next.slug}
                      date={next.date}
                    />
                  ))}
                </>
              )}

              {/* 현재 내 글 */}
              <Neighbor
                title={study.title!}
                slug={study.slug!}
                date={study.createdAt}
                current
              />

              {/* 아래쪽(이전 글) 최대 2개 */}
              {prevNeighborList.length && (
                <>
                  {nextNeighbortList.map((prev) => (
                    <Neighbor
                      key={prev.slug}
                      title={prev.title}
                      slug={prev.slug}
                      date={prev.date}
                    />
                  ))}
                </>
              )}
            </ul>
          </section>
        )}
        <Link href="/study">&larr; 전체 목록 보기</Link>
      </div>
    </>
  )
}
