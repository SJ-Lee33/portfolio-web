import ProjectItem from './project-item'

export default function ProjectList() {
  return (
    <div className="flex flex-col p-4 gap-2 text-title-s bg-soft rounded-md">
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
    </div>
  )
}
