import { ProjectListDto } from '@/types/project/project-list-dto'
import ProjectTypeLabel from './project-type-label'
import Image from 'next/image'
import { formatDate } from '@/utils/formatDate'
import SkillDisplay from '@/components/skill-display'
import classNames from 'classnames'

export default function ProjectItem(project: ProjectListDto) {
  return (
    <div
      className={classNames(
        'grid gap-4 min-h-[150px] p-4',
        'hover:bg-soft',
        'grid-cols-2', // sm ~ md
        'md:grid-cols-3', // md ~ lg
        'lg:grid-cols-4', // lg ~ xl
      )}
    >
      <div className="relative">
        {/* 라벨 */}
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

      <div
        className={classNames(
          'flex flex-col p-2 justify-between',
          '', // sm ~ md
          'md:col-span-2', // md ~ lg
          'lg:col-span-3', // lg ~ xl
        )}
      >
        {/* 제목&부제목 */}
        <div className="flex flex-col">
          <div className="text-title-l font-extrabold">{project.title}</div>
          <div className="text-body-m font-light">{project?.summary}</div>
        </div>

        {/* 출시일&기술스택 */}
        <div className="flex flex-col gap-2">
          <div className="text-body-s text-neutralLight">
            {formatDate(project.releaseDate)}
          </div>
          <div className="bg-[#f6f6f6] rounded-sm">
            <SkillDisplay skills={project.skill} small />
          </div>
        </div>
      </div>
    </div>
  )
}
