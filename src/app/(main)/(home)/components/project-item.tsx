import { ProjectListDto } from '@/types/project/project-list-dto'
import ProjectTypeLabel from './project-type-label'
import Image from 'next/image'
import { formatDate } from '@/utils/formatDate'
import SkillDisplay from '@/components/skill-display'

export default function ProjectItem(project: ProjectListDto) {
  return (
    <div className="flex gap-4 min-h-[150px] hover:bg-soft p-4">
      <div className="relative w-1/3">
        <div
          className={`z-10 absolute top-2 left-2 py-1 px-2 text-caption flex items-center bg-white opacity-90 text-neutral rounded-md font-light`}
        >
          <ProjectTypeLabel projectTypes={project.projectTypes} />
        </div>
        {/* 이미지  */}
        <Image
          src={project.thumbnail}
          alt="project thumbnail"
          width={100}
          height={100}
          className="w-full h-full object-cover bg-primary rounded-md"
        />
      </div>

      <div className="flex flex-col gap-4">
        {/* 제목&부제목 */}
        <div className="flex flex-col">
          <div className="text-title-l font-extrabold">{project.title}</div>
          <div className="text-body-m">{project.summary}</div>
        </div>

        {/* 출시일&기술스택 */}
        <div className="flex flex-col gap-2">
          <div className="text-body-s text-neutralLight">
            {formatDate(project.releaseDate)}
          </div>
          <SkillDisplay skills={project.skill} small />
        </div>
      </div>
    </div>
  )
}
