import { useProjects } from '@/app/project/hooks/use-project'
import ProjectList from './project-list'
import ProjectMenu from './project-nav-bar'

export default function ThirdScreen() {
  const { projects, error } = useProjects()
  console.log(projects)
  return (
    <div className="w-screen flex flex-col gap-2 p-10">
      <div className="w-full h-[0.5px] bg-neutralLight my-10" />
      <ProjectMenu />
      <ProjectList />
    </div>
  )
}
