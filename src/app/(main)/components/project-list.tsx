import ProjectItem from './project-item'

export default function ProjectList() {
  return (
    <div className="flex flex-col gap-1 text-title-s rounded-md">
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
    </div>
  )
}
