import ProjectTypeLabel from './project-type-label'
import Image from 'next/image'
import { formatDate } from '@/utils/formatDate'
import SkillDisplay from '@/components/skill-display'
import classNames from 'classnames'
import { PROJECT_LIST_QUERYResult } from '@/sanity/types'

type ProjectListProps = PROJECT_LIST_QUERYResult[number] & {
  index: number | 0
}
export default function ProjectItem(project: ProjectListProps) {
  const NumberCircle = ({ index }: { index: number }) => {
    return (
      <div
        className={`z-5 absolute -top-1 -left-2 
      flex items-center justify-center h-8 w-8 rounded-full
      font-semibold text-body-s 
      text-soft bg-primary 
      duration-300 group-hover:text-primary group-hover:bg-white group-hover:border-2 group-hover:border-primary`}
      >
        {index + 1}
      </div>
    )
  }

  return (
    <div
      className={classNames(
        'flex flex-col gap-2 md:gap-5 rounded-lg p-2',
        'group hover:bg-white hover:shadow-md duration-300',
        'md:grid md:grid-cols-3', // md ~
        'xxl:grid-cols-5', // xl ~
      )}
    >
      {/* 썸네일 */}
      <div className="relative h-[180px] sm:h-[230px] xs:col-span-1 group-hover:scale-105 group-hover:shadow-md transition-transform duration-300">
        {/* 번호 */}
        <NumberCircle index={project.index} />
        {/* 라벨 */}
        <div
          className={`z-5 absolute top-2 right-2 
            flex items-center px-2 py-1
            font-medium text-caption text-neutral
            bg-white/90 rounded-xl`}
        >
          <ProjectTypeLabel projectTypes={project.projectTypes!} />
        </div>

        {/* 썸네일 */}
        <Image
          src={project.thumbnail}
          alt="project thumbnail"
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-md shadow-lg shadow-neutralLight/30 "
        />
      </div>

      {/* 헤드라인 */}
      <div
        className={classNames(
          'flex flex-col justify-between p-4',
          'md:col-span-2', // sm
          'xxl:col-span-4', // xxl ~
        )}
      >
        {/* 제목&요약 */}
        <div className="flex flex-col gap-2">
          <div
            className={classNames(
              'duration-300 group-hover:text-primary',
              'font-bold text-title-m',
            )}
          >
            {project.title}
          </div>
          <div className="text-body-m text-neutral/60">{project?.summary}</div>
        </div>

        {/* 출시일&기술스택 */}
        <div className="flex flex-col gap-2">
          <div className="text-body-s text-neutralLight font-light mt-3">
            {formatDate(project.startDate!)} -{' '}
            {formatDate(project.releaseDate!)}
          </div>
          <div className="hidden md:block">
            <SkillDisplay skills={project.skill!} small />
          </div>

          <div className="md:hidden flex flex-wrap gap-2 mb-5">
            {project.skill!.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 text-caption font-semibold bg-white border border-neutralLight text-neutral px-3 py-1.5 rounded-md
                     hover:border-primary hover:text-primary transition-colors duration-150"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
