'use client'

import { useState, useEffect } from 'react'

interface Section {
  title: string
  _type?: string
}

interface Props {
  sections: Section[]
  hasLegacy: boolean
  hasOverview: boolean
  hasResult: boolean
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-가-힣]/g, '')
}

export default function ProjectSidebar({
  sections,
  hasLegacy,
  hasOverview,
  hasResult,
}: Props) {
  // 레거시 모드면 사이드바 없음 (Portable 자체 TOC 사용)
  if (hasLegacy && sections.length === 0) return null

  // navItems 조립: Overview(있으면) → sections → Result(있으면)
  const navItems: { id: string; label: string }[] = []
  if (hasOverview) navItems.push({ id: 'overview', label: 'Overview' })
  sections.forEach((s) =>
    navItems.push({ id: slugify(s.title), label: s.title }),
  )
  if (hasResult) navItems.push({ id: 'result', label: 'Result' })

  if (navItems.length === 0) return null

  return <SidebarClient navItems={navItems} />
}

function SidebarClient({
  navItems,
}: {
  navItems: { id: string; label: string }[]
}) {
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

  return (
    <aside className="hidden lg:flex flex-col w-[200px] xl:w-[220px] flex-shrink-0">
      {/* sticky: NavBar(65px) + 약간의 여백 */}
      <div className="sticky top-[85px]">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4 px-3">
          Navigation
        </p>
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-600 rounded-r-full" />
                )}
                <span className="pl-1">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
