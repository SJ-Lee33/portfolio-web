import ProjectList from './project-list'
import ProjectNavBar from './project-nav-bar'

export default function ThirdScreen() {
  return (
    <div className="w-screen flex flex-col gap-2 p-10">
      <div className="w-full h-[0.5px] bg-neutralLight my-10" />
      <ProjectNavBar />
      <ProjectList />
    </div>
  )
}
