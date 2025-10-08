'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function ScrollTo({
  targetId = 'profile',
  whenPathStartsWith = `/${targetId}`,
  offset = 0, // 고정 헤더 높이
  behavior = 'smooth',
}: {
  targetId?: string
  whenPathStartsWith?: string
  offset?: number
  behavior?: ScrollBehavior
}) {
  const pathname = usePathname()
  const sp = useSearchParams()

  useEffect(() => {
    if (!pathname?.startsWith(whenPathStartsWith)) return
    const el = document.getElementById(targetId)
    if (!el) return

    // 다음 페인트 타이밍에 실행(렌더 완료 보장)
    requestAnimationFrame(() => {
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior })
    })
  }, [pathname, sp?.toString(), targetId, whenPathStartsWith, offset, behavior])

  return null
}
