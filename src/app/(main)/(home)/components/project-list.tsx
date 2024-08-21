'use client'
import Link from 'next/link'
import ProjectItem from './project-item'
import { ProjectListDto } from '@/types/project/project-list-dto'
import { useProjects } from '@/app/(main)/project/hooks/use-project'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function ProjectList() {
  const { projects, isLoading } = useProjects()
  if (isLoading) return <LoadingSpinner />
  return (
    <div className="flex flex-col gap-2 text-title-s rounded-md">
      {projects?.map((project: ProjectListDto) => {
        return (
          <Link
            href={`/project/${project.id}`}
            key={project.id}
            target="_blank"
            className="w-full"
          >
            <ProjectItem
              id={project.id}
              title={project.title}
              projectTypes={project.projectTypes}
              type={project.type}
              releaseDate={project.releaseDate}
              summary={project.summary}
              thumbnail={project.thumbnail}
              skill={project?.skill}
            />
          </Link>
        )
      })}
    </div>
  )
}
