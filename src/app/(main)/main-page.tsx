'use client'

import React, { useEffect, useRef } from 'react'
import FirstScreen from './components/first-screen'
import SecondScreen from './components/second-screen'
import ThirdScreen from './components/third-screen'
import LastScreen from './components/last-screen'

export default function MainPage() {
  const profileRef = useRef<HTMLDivElement>(null)
  const projectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.pathname === '/profile'
    ) {
      profileRef.current?.scrollIntoView({ behavior: 'instant' })
    } else if (
      typeof window !== 'undefined' &&
      window.location.pathname === '/project'
    ) {
      projectRef.current?.scrollIntoView({ behavior: 'instant' })
    }
  }, [])

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
    </div>
  )
}
