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
        'grid gap-5 p-4 text-neutral',
        'group hover:bg-neutralLighter/80',
        'grid-cols-3', // sm ~ md
        'lg:grid-cols-4', // lg ~ xl
      )}
    >
      <div className="relative h-[250px] col-span-1">
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
          className="w-full h-full object-cover bg-primary rounded-md shadow-lg shadow-neutralLight/30"
        />
      </div>

      <div
        className={classNames(
          'flex flex-col justify-between',
          'col-span-2', // md ~ lg
          'lg:col-span-3', // lg ~ xl
        )}
      >
        {/* 제목&부제목 */}
        <div className="flex flex-col gap-2">
          <div
            className={classNames(
              'text-title-l py-1 px-4 bg-neutralLighter/80 rounded-md',
              'font-extrabold',
              'group-hover:text-white group-hover:bg-primary duration-300',
            )}
          >
            {project.title}
          </div>
          <div className="text-body-m font-light px-4 group-focus:text-white">
            {project?.summary}
          </div>
        </div>

        {/* 출시일&기술스택 */}
        <div className="flex flex-col gap-2 px-4">
          <div className="text-body-s text-neutralLight">
            {formatDate(project.releaseDate)}
          </div>
          <SkillDisplay skills={project.skill} />
        </div>
      </div>
    </div>
  )
}
