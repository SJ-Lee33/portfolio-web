'use client'

import NavBar from '@/components/nav-bar/nav-bar'
import { useEffect, useState } from 'react'

export default function HeaderClient() {
  const [headerDesign, setHeaderDesign] = useState('text-white')
  const [shownLogo, setShownLogo] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY

      if (position >= 100) {
        // 스크롤 진행후
        setHeaderDesign('bg-white text-neutral shadow-md shadow-neutral/5')
        setShownLogo(true)
      } else {
        // 맨위일때
        setHeaderDesign('bg-opacity-0 text-white')
        setShownLogo(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return <NavBar shownLogo={shownLogo} headerDesign={headerDesign} />
}
