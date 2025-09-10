import Link from 'next/link'
import ProjectItem from './project-item'
import { sanityFetch } from '@/sanity/lib/live'
import { PROJECT_COUNT_QUERY, PROJECT_LIST_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import {
  PROJECT_COUNT_QUERYResult,
  PROJECT_LIST_QUERY_TGResult,
  PROJECT_QUERYResult,
} from '@/sanity/types'
import { ProjectType } from '@/sanity/schemaTypes/const/projectType'

export default async function ProjectList({
  projectType,
  page = 1,
  pageSize = 10,
}: {
  projectType: ProjectType | null
  page?: number
  pageSize?: number
}) {
  const offset = (page - 1) * pageSize

  // 프로젝트 목록
  const { data: projectList } = (await sanityFetch<typeof PROJECT_LIST_QUERY>({
    query: PROJECT_LIST_QUERY,
    params: { projectType, offset, limit: pageSize }, // ← key는 projectType
  })) as { data: PROJECT_LIST_QUERY_TGResult }

  // 프로젝트 총 수
  const { data: count } = (await sanityFetch<typeof PROJECT_COUNT_QUERY>({
    query: PROJECT_COUNT_QUERY,
    params: { projectType }, // ← 동일 키
  })) as { data: PROJECT_COUNT_QUERYResult }

  const hasPrev = page > 1
  const hasNext = offset + projectList.length < count

  const makeQs = (p: number) => {
    const sp = new URLSearchParams()
    if (projectType) sp.set('projectType', projectType) // ← 동일 키
    if (p > 1) sp.set('page', String(p))
    return `?${sp.toString()}`
  }

  type ProjectListItem = PROJECT_LIST_QUERY_TGResult[number]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-title-s rounded-md">
        {projectList.map((project: ProjectListItem, index: number) => (
          <React.Fragment key={project.id}>
            {index > 0 && <div className="border-t border-neutralLight m-4" />}
            <Link
              href={`/project/${project.id}`}
              target="_blank"
              className="w-full"
            >
              <ProjectItem
                id={project.id}
                title={project.title}
                projectTypes={project.projectTypes ?? null}
                startDate={project.startDate}
                releaseDate={project.releaseDate}
                summary={project.summary}
                thumbnail={project.thumbnail}
                skill={project.skill}
                index={index}
              />
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* 페이지네이션 UI 예시 */}
      <nav className="flex items-center justify-between">
        {hasPrev ? <Link href={makeQs(page - 1)}>← Prev</Link> : <span />}
        <div className="text-sm text-zinc-500">
          {projectList.length ? offset + 1 : 0}–{offset + projectList.length} /{' '}
          {count}
        </div>
        {hasNext ? <Link href={makeQs(page + 1)}>Next →</Link> : <span />}
      </nav>
    </div>
  )
}
