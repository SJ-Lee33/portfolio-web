import NavBar from '@/components/nav-bar/nav-bar'
import HomePage from './(main)/(home)/home-page'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function MainPage() {
  return (
    <div className="w-screen">
      <header className="w-full fixed top-0 z-50">
        <NavBar />
      </header>
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <HomePage />
        </Suspense>
      </main>
    </div>
  )
}
