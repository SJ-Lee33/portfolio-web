import NavBar from '@/components/nav-bar/nav-bar'
import MainPage from './(main)/main-page'

export default function Home() {
  return (
    <div className="w-screen">
      <header>
        <NavBar />
      </header>

      <main className="mt-10 bg-soft">
        <MainPage />
      </main>

      <footer>footer line</footer>
    </div>
  )
}
