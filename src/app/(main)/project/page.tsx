import HomePage from '../(home)/home-page'
import { ProjectType } from '@/sanity/schemaTypes/const/projectType'
export const dynamic = 'force-dynamic'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ projectType?: string }>
}) {
  const sp = await searchParams
  const raw = sp.projectType
  const projectType: ProjectType | null =
    raw === 'engineering' || raw === 'design' || raw === 'planning'
      ? (raw as ProjectType)
      : null

  // ✅ 같은 홈 셸을 렌더하되, 프로젝트 섹션으로 자동 스크롤
  return <HomePage projectType={projectType} autoScrollTo="project" />
}
