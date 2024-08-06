import NavBar from '@/components/nav-bar/nav-bar'
import ProjectDetailPage from './ProjectDetailPage'

type Props = {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const temp = [{ title: 'hello' }]
  return (
    <div className="w-screen z-50">
      <header>
        <NavBar />
      </header>

      <main className="mt-12">
        <ProjectDetailPage id={params.slug} project={temp} />
      </main>
    </div>
  )
}
