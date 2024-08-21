import HomePage from './(main)/(home)/home-page'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function MainPage() {
  return (
    <div className="w-screen">
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <HomePage />
        </Suspense>
      </main>
    </div>
  )
}
