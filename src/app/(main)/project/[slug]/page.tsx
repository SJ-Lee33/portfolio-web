import NavBar from '@/components/nav-bar/nav-bar'
import ProjectDetailPage from './ProjectDetailPage'

export default async function Page() {
  return (
    <div className="w-screen z-50">
      <header>
        <NavBar />
      </header>

      <main className="mt-12">
        <ProjectDetailPage />
      </main>
    </div>
  )
}
