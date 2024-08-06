import Link from 'next/link'
import ProjectItem from './project-item'

export default function ProjectList() {
  return (
    <div className="flex flex-col gap-1 text-title-s rounded-md">
      <Link className="w-full" href={`/project/1`}>
        <ProjectItem />
      </Link>
      <ProjectItem />
      <ProjectItem />
    </div>
  )
}
