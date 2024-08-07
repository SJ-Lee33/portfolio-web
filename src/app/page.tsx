import NavBar from '@/components/nav-bar/nav-bar'
import MainPage from './(main)/(home)/main-page'

export default function Home() {
  return (
    <div className="w-screen z-50">
      <header>
        <NavBar />
      </header>

      <main className="mt-12">
        <MainPage />
      </main>
    </div>
  )
}
