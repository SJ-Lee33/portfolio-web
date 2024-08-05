import MainPage from './(main)/main-page'

export default function Home() {
  return (
    <div className="w-screen">
      <header>nav bar</header>

      <main className="mt-8 bg-soft">
        <MainPage />
      </main>

      <footer>footer line</footer>
    </div>
  )
}
