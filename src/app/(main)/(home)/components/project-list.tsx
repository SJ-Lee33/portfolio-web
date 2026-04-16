import Link from 'next/link'
import ProjectItem from './project-item'
import { sanityFetch } from '@/sanity/lib/live'
import { PROJECT_LIST_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import { PROJECT_LIST_QUERYResult } from '@/sanity/types'
import { ProjectType } from '@/sanity/schemaTypes/const/projectType'
import { unstable_noStore } from 'next/cache'

type ProjectListItem = PROJECT_LIST_QUERYResult[number]

export default async function ProjectList({
  projectType,
}: {
  projectType: ProjectType | null
}) {
  unstable_noStore()

  // 프로젝트 목록
  const { data: projectList } = (await sanityFetch<typeof PROJECT_LIST_QUERY>({
    query: PROJECT_LIST_QUERY,
    params: { projectType }, // ← key는 projectType
  })) as { data: PROJECT_LIST_QUERYResult }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 text-title-s rounded-md">
        {projectList.map((project: ProjectListItem, index: number) => (
          <React.Fragment key={project.slug}>
            {index > 0 && <div className="border-t border-neutralLight m-4" />}
            <Link
              href={`/project/${project.slug}`}
              target="_blank"
              className="w-full"
            >
              <ProjectItem
                id={project.id}
                slug={project.slug}
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
    </div>
  )
}
