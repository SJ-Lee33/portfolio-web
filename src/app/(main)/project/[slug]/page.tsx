import NavBar from '@/components/nav-bar/nav-bar'
import ProjectDetailPage from './ProjectDetailPage'
import { getProjectById } from '@/hooks/get-project-by-id'

type Props = {
  params: {
    slug: string
  }
}

export default async function Page({ params: { slug } }: Props) {
  const project = await getProjectById(slug)
  return (
    <div className="w-screen z-50">
      <header>
        <NavBar />
      </header>

      <main className="mt-12">
        <ProjectDetailPage project={project} />
      </main>
    </div>
  )
}
