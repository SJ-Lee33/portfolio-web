import { ProjectType } from '@/sanity/schemaTypes/const/projectType'
import ProjectList from './project-list'
import ProjectNavBar from './project-nav-bar'

export default function ProjectsScreen({
  projectType,
}: {
  projectType: ProjectType | null
}) {
  return (
    <div
      className={`mx-auto max-w-mobile md:max-w-desktop flex flex-col gap-2 px-10`}
    >
      <div className="w-full h-[0.5px] bg-neutralLight my-10" />
      <ProjectNavBar />
      <div className="flex px-5 text-body-s">▼ 출시일 순 정렬</div>
      <ProjectList projectType={projectType} />
    </div>
  )
}
