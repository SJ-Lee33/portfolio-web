import ProjectList from './project-list'
import ProjectNavBar from './project-nav-bar'

export default function ProjectsScreen() {
  return (
    <div className="w-screen flex flex-col gap-2 p-10">
      <div className="w-full h-[0.5px] bg-neutralLight my-10" />
      <ProjectNavBar />
      <div className="flex px-5 text-body-s">▼ 출시일 순 정렬</div>
      <ProjectList />
    </div>
  )
}
