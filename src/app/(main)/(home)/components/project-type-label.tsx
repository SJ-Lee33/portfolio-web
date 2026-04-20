import React from 'react'

type ProjectTypes =
  | {
      engineering?: boolean
      planning?: boolean
      design?: boolean
    }
  | null
  | undefined

interface Props {
  projectTypes: ProjectTypes
  badge?: boolean
}

export default function ProjectTypeLabel({
  projectTypes,
  badge = false,
}: Props) {
  const MAP: Record<string, string> = {
    engineering: '개발',
    planning: '기획',
    design: '디자인',
  }

  if (!projectTypes) return null

  const labels = Object.entries(projectTypes)
    .filter(([_, value]) => value)
    .map(([key]) => MAP[key])
    .filter(Boolean)

  if (labels.length === 0) return null

  // ✅ 1. 문자열 모드
  if (!badge) {
    return <span>{labels.join(' · ')}</span>
  }

  // ✅ 2. 배지 모드
  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((label) => (
        <span
          key={label}
          className="text-body-s font-semibold tracking-widest text-primary uppercase bg-primaryLighter/50 px-3 py-1 rounded-full"
        >
          {label}
        </span>
      ))}
    </div>
  )
}
