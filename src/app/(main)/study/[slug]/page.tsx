import { sanityFetch } from '@/sanity/lib/live'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { STUDY_QUERY } from '@/sanity/lib/queries'
import { STUDY_QUERYResult } from '@/sanity/types'
import Portable from '@/components/portable-text/portable-text-component'
import { getStudy } from '@/hooks/get-study'
import NavBar from '@/components/nav-bar/nav-bar'
import ProjectTitle from '../../project/[slug]/components/project-title'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = await getStudy(slug)

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
      </div>

      <Link href="/study">&larr; Return to index</Link>
    </>
  )
}
