'use client'

import { useState, useEffect } from 'react'

interface Props {
  navItems: { id: string; label: string }[]
}

export default function ProjectMobileNav({ navItems }: Props) {
  const [activeId, setActiveId] = useState<string>(navItems[0]?.id ?? '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [navItems])

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (navItems.length === 0) return null

  return (
    <div className="lg:hidden sticky top-[65px] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex-shrink-0 text-xs font-semibold px-4 py-3 border-b-2 transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-400 border-transparent hover:text-gray-700'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
