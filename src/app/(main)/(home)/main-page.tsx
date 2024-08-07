'use client'

import React, { useEffect, useRef } from 'react'
import FirstScreen from './components/first-screen'
import SecondScreen from './components/second-screen'
import ThirdScreen from './components/third-screen'
import LastScreen from './components/last-screen'
import { useTypeSearchParam } from '../project/hooks/use-type-search-param'

export default function MainPage() {
  const profileRef = useRef<HTMLDivElement>(null)
  const projectRef = useRef<HTMLDivElement>(null)
  const type = useTypeSearchParam()

  useEffect(() => {
    const path = window.location.pathname

    // 현재 URL 경로가 '/profile'인 경우
    if (path === '/profile') {
      profileRef.current?.scrollIntoView({ behavior: 'instant' })
    } else if (path === '/project' || (path === '/project?=' && type)) {
      projectRef.current?.scrollIntoView({ behavior: 'instant' })
    }
  }, [type]) // router.asPath가 변경될 때마다 useEffect 실행

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
