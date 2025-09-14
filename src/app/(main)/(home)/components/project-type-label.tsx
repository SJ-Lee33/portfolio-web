import React from 'react'

export default function ProjectTypeLabel({
  projectTypes,
}: {
  projectTypes: {
    development?: boolean
    marketing?: boolean
    design?: boolean
  } | null
}) {
  const MAP: { [key: string]: string } = {
    development: '개발',
    marketing: '마케팅',
    design: '디자인',
  }
  const typeLabels = Object.entries(projectTypes!)
    .filter(([_, value]) => value)
    .map(([key]) => MAP[key])
    .sort() // 사전순
    .join(' | ')
  return <div>{typeLabels}</div>
}
