import Link from 'next/link'
import Portable from '@/components/portable-text/portable-text-component'
import { getStudy, getStudyNeighbors } from '@/hooks/get-study'
import NavBar from '@/components/nav-bar/nav-bar'
import ProjectTitle from '../../project/[slug]/components/project-title'
import { formatDate } from '@/utils/formatDate'
import { BsFillCaretRightFill } from 'react-icons/bs'
import { IoDocumentText } from 'react-icons/io5'
type NeighborItem = {
  title: string
  date: string
  slug: string
  current?: boolean
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = await getStudy(slug)
  const neighbors = await getStudyNeighbors(slug)

  const prevNeighborList = (neighbors?.prev ?? []) as NeighborItem[]
  const nextNeighborList = (neighbors?.next ?? []) as NeighborItem[]
  const { aboveList, belowList } = buildFiveWindow(
    prevNeighborList,
    nextNeighborList,
  )

  const Neighbor = ({ title, date, slug, current }: NeighborItem) => {
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

      <main className="pt-[90px] md:pt-[65px]">
        {/* 제목 (상단고정) */}
        <ProjectTitle title={study.title || ''} />

        {/* 본문 */}
        <div className="mx-auto max-w-mobile md:max-w-desktop">
          {/* 카테고리 */}
          <div className="relative flex items-center gap-1 text-body-l text-neutralLight mt-[50px] -mb-[30px]">
            <IoDocumentText />
            <Link
              href={`/study/category/${study.categorySlug}`}
              className="font-semibold underline hover:text-primary"
            >
              {study.categoryTitle}
            </Link>
            <span>{'>'}</span>
            <span>{study.title}</span>
          </div>

          {/* 내용 */}
          <Portable value={study.body!} />

          {/* 같은 카테고리의 다른 글 */}
          {(aboveList.length > 0 || belowList.length > 0) && (
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

              <ul className="flex flex-col my-3 divide-y-[0.5px] divide-neutralLight">
                {/* 위쪽(다음 글들) */}
                {aboveList.map((n) => (
                  <Neighbor
                    key={n.slug}
                    title={n.title}
                    slug={n.slug}
                    date={n.date}
                  />
                ))}

                {/* 현재 글 */}
                <Neighbor
                  title={study.title!}
                  slug={study.slug!}
                  date={study.createdAt}
                  current
                />

                {/* 아래쪽(이전 글들) */}
                {belowList.map((p) => (
                  <Neighbor
                    key={p.slug}
                    title={p.title}
                    slug={p.slug}
                    date={p.date}
                  />
                ))}
              </ul>
            </section>
          )}
          <Link href="/study" className="hover:text-primary">
            &larr; 전체 목록 보기
          </Link>
        </div>
      </main>
    </>
  )
}

function buildFiveWindow(prev: NeighborItem[], next: NeighborItem[]) {
  // prev: order(serial desc) = "가장 가까운 이전 글"이 배열의 앞쪽
  // next: order(serial asc)  = "가장 가까운 다음 글"이 배열의 앞쪽
  const MAX_TOTAL = 5 // 위 + 본인 + 아래 = 5
  const MAX_SIDE = 4 // 한쪽에서 최대 4개까지 사용 가능 (쿼리에서 확보)

  // 기본 할당 (2/본인/2)
  let takeAbove = Math.min(2, next.length)
  let takeBelow = Math.min(2, prev.length)

  // 현재 선택 수(본인 포함 X)
  let used = takeAbove + takeBelow

  // 남은 칸을 채우기: 우선 "부족한 쪽"을 기준으로 채움
  // 1) 시작부(이전이 모자람)면 위(next)에서 먼저 메꿔라
  // 2) 끝부(다음이 모자람)면 아래(prev)에서 먼저 메꿔라
  let remaining = MAX_TOTAL - 1 - used // -1은 본인

  if (remaining > 0) {
    // 시작부 우선 보충
    if (takeBelow < 2) {
      const can = Math.min(
        remaining,
        Math.max(0, Math.min(MAX_SIDE, next.length) - takeAbove),
      )
      takeAbove += can
      remaining -= can
    }
  }
  if (remaining > 0) {
    // 끝부 우선 보충
    if (takeAbove < 2) {
      const can = Math.min(
        remaining,
        Math.max(0, Math.min(MAX_SIDE, prev.length) - takeBelow),
      )
      takeBelow += can
      remaining -= can
    }
  }
  if (remaining > 0) {
    // 그래도 남으면 가용한 쪽에서 더 채움 (균형보다는 가용 우선)
    const addAbove = Math.min(
      remaining,
      Math.max(0, Math.min(MAX_SIDE, next.length) - takeAbove),
    )
    takeAbove += addAbove
    remaining -= addAbove

    const addBelow = Math.min(
      remaining,
      Math.max(0, Math.min(MAX_SIDE, prev.length) - takeBelow),
    )
    takeBelow += addBelow
    remaining -= addBelow
  }

  // 실제 목록 자르기
  const aboveList = next.slice(0, takeAbove) // 위(다음 글들) → 기존대로 "가까운 순" 표시
  const belowList = prev.slice(0, takeBelow) // 아래(이전 글들) → "가까운 순" 표시

  return { aboveList, belowList }
}
