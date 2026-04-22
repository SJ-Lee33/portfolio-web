'use client'

import { useState, useEffect } from 'react'

interface Section {
  title: string
  _type?: string
}

interface Props {
  sections: Section[]
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
  hasOverview,
  hasResult,
}: Props) {
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
    <aside className="hidden md:flex flex-col w-[200px] xl:w-[220px] flex-shrink-0 sticky top-[100px] self-start">
      <p className="text-body-s font-bold tracking-widest text-neutral mb-4 px-3">
        목차
      </p>

      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-left px-3 py-2.5 rounded-lg text-body-m font-medium transition-all duration-150 relative ${
                isActive
                  ? 'text-primary bg-primaryLighter/50 font-semibold'
                  : 'text-neutral hover:bg-neutralLighter'
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
    </aside>
  )
}
