'use client'

import React, { useRef, Suspense } from 'react'
import FirstScreen from './components/first-screen'
import SecondScreen from './components/second-screen'
import ThirdScreen from './components/third-screen'
import LastScreen from './components/last-screen'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Scroll } from './components/scroll'

const HomePage: React.FC = () => {
  const profileRef = useRef<HTMLDivElement>(null)
  const projectRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <FirstScreen />
      <div ref={profileRef}>
        <SecondScreen />
      </div>
      <div ref={projectRef}>
        <ThirdScreen />
      </div>
      <LastScreen />
      <Suspense fallback={<LoadingSpinner />}>
        <Scroll profileRef={profileRef} projectRef={projectRef} />
      </Suspense>
    </div>
  )
}

export default HomePage
