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
        'grid gap-2 md:gap-5 p-4 text-neutral',
        'group hover:bg-secondary hover:text-white duration-300',
        'grid-cols-3', // sm ~ md
        'lg:grid-cols-4', // lg ~ xl
      )}
    >
      <div className="relative h-[200px] col-span-1">
        {/* 라벨 */}
        <div
          className={`z-10 absolute top-2 left-2 py-1 px-2 text-caption flex items-center bg-white opacity-90 text-neutral rounded-md font-medium`}
        >
          <ProjectTypeLabel projectTypes={project.projectTypes} />
        </div>
        {/* 이미지  */}
        <Image
          src={project.thumbnail}
          alt="project thumbnail"
          width={250}
          height={250}
          className="w-full h-full object-cover bg-secondary rounded-md shadow-lg shadow-neutralLight/30"
        />
      </div>

      <div
        className={classNames(
          'flex flex-col justify-between',
          'col-span-2', // md ~ lg
          'lg:col-span-3', // lg ~ xl
        )}
      >
        {/* 제목&요약 */}
        <div className="flex flex-col gap-2">
          <div
            className={classNames(
              'py-1 px-2 md:px-4 bg-neutralLighter/80 rounded-md',
              'group-hover:bg-secondary duration-300',
              'font-extrabold text-body-l md:text-title-m',
            )}
          >
            {project.title}
          </div>
          <div className="text-body-m md:text-body-l px-2 md:px-4">
            {project?.summary}
          </div>
        </div>

        {/* 출시일&기술스택 */}
        <div className="flex flex-col gap-2 px-2 md:px-4">
          <div className="text-body-s text-neutralLight group-hover:text-white duration-300 font-light mt-3">
            {formatDate(project.releaseDate)}
          </div>
          <SkillDisplay skills={project.skill} small />
        </div>
      </div>
    </div>
  )
}
