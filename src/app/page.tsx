import NavBar from '@/components/nav-bar/nav-bar'
import HomePage from './(main)/(home)/home-page'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function MainPage() {
  return (
    <div className="w-screen">
      <header>
        <NavBar />
      </header>
      <main className="mt-12">
        <Suspense fallback={<LoadingSpinner />}>
          <HomePage />
        </Suspense>
      </main>
    </div>
  )
}
