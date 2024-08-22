'use client'

import { useEffect, RefObject } from 'react'
import { useSearchParams } from 'next/navigation'

interface ScrollProps {
  profileRef: RefObject<HTMLDivElement>
  projectRef: RefObject<HTMLDivElement>
}

export function Scroll({ profileRef, projectRef }: ScrollProps) {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  useEffect(() => {
    const path = window.location.pathname

    if (path === '/profile') {
      profileRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else if (path === '/project' || (path === '/project' && type)) {
      projectRef.current?.scrollIntoView({ behavior: 'auto' })
    }
  }, [type, profileRef, projectRef])

  return null
}
