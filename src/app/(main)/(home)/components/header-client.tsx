'use client'

import NavBar from '@/components/nav-bar/nav-bar'
import { useEffect, useState } from 'react'

const FIXED = 'bg-white text-neutral-900 shadow-md shadow-black/5'
const TOP = 'bg-white/0 text-white'

export default function HeaderClient({
  atStudyPage,
}: {
  atStudyPage?: boolean
}) {
  const [headerDesign, setHeaderDesign] = useState(() =>
    atStudyPage ? FIXED : TOP,
  )
  const [shownLogo, setShownLogo] = useState(() => !!atStudyPage)

  useEffect(() => {
    // 스터디 페이지면 고정 상태로 설정하고 스크롤 리스너는 달지 않음
    if (atStudyPage) {
      setHeaderDesign(FIXED)
      setShownLogo(true)
      return
    }

    const handleScroll = () => {
      const y = window.scrollY
      if (y >= 100) {
        setHeaderDesign((p) => (p === FIXED ? p : FIXED))
        setShownLogo((p) => (p ? p : true))
      } else {
        setHeaderDesign((p) => (p === TOP ? p : TOP))
        setShownLogo((p) => (p ? false : p))
      }
    }

    // 초기 위치 반영 + 리스너 등록
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [atStudyPage])

  return <NavBar shownLogo={shownLogo} headerDesign={headerDesign} />
}
