import React from 'react'

export default function ProjectTypeLabel({
  projectTypes,
}: {
  projectTypes:
    | {
        engineering?: boolean
        planning?: boolean
        design?: boolean
      }
    | null
    | undefined
}) {
  const MAP: { [key: string]: string } = {
    engineering: '개발',
    planning: '기획',
    design: '디자인',
  }
  const typeLabels = Object.entries(projectTypes!)
    .filter(([_, value]) => value)
    .map(([key]) => MAP[key])
    .sort() // 사전순
    .join(' | ')
  return <div>{typeLabels}</div>
}
