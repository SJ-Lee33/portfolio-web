import { ProjectType } from '@/sanity/schemaTypes/const/projectType'
import HomePage from './(main)/(home)/home-page'
export const dynamic = 'force-dynamic'

export default async function MainPage({
  searchParams,
}: {
  searchParams: { projectType?: string }
}) {
  const sp = await searchParams
  const raw = sp.projectType
  const projectType: ProjectType | null =
    raw === 'development' || raw === 'design' || raw === 'marketing'
      ? (raw as ProjectType)
      : null

  return <HomePage projectType={projectType} />
}
