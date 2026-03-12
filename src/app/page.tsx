import { ProjectType } from '@/sanity/schemaTypes/const/projectType'
import HomePage from './(main)/(home)/home-page'

export default async function MainPage({
  searchParams,
}: {
  searchParams: Promise<{ projectType?: string }>
}) {
  const { projectType: raw } = await searchParams

  const projectType: ProjectType | null =
    raw === 'engineering' || raw === 'design' || raw === 'planning'
      ? (raw as ProjectType)
      : null

  return <HomePage projectType={projectType} />
}
