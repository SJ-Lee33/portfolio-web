import ProjectTypeLabel from './project-type-label'
import Image from 'next/image'
import { formatDate } from '@/utils/formatDate'
import SkillDisplay from '@/components/skill-display'
import classNames from 'classnames'
import { PROJECT_LIST_QUERY_TGResult } from '@/sanity/types'

type ProjectListProps = PROJECT_LIST_QUERY_TGResult[number] & {
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
      duration-300 group-hover:text-primaryDark group-hover:bg-white group-hover:border-2 group-hover:border-primaryDark`}
      >
        {index + 1}
      </div>
    )
  }
  return (
    <div
      className={classNames(
        'xs:grid xs:gap-5 p-4 text-neutral',
        'group hover:bg-secondary hover:text-white duration-300',
        'xs:grid-cols-3', // xs ~ md
        'lg:grid-cols-4', // lg ~ xl
        'xxl:grid-cols-5', // xxl ~
      )}
    >
      {/* 썸네일 */}
      <div className="relative h-[180px] pb-4 sm:h-[230px] xs:col-span-1 xs:pb-0">
        {/* 번호 */}
        <NumberCircle index={project.index} />
        {/* 라벨 */}
        <div
          className={`z-5 absolute top-2 right-2 
            py-1 px-2 flex items-center
            font-medium text-caption text-neutral
          bg-white opacity-90 rounded-md `}
        >
          <ProjectTypeLabel projectTypes={project.projectTypes} />
        </div>
        {/* 이미지  */}
        <Image
          src={project.thumbnail}
          alt="project thumbnail"
          width={300}
          height={300}
          className="w-full h-full object-cover bg-secondary rounded-md shadow-lg shadow-neutralLight/30"
        />
      </div>

      {/* 헤드라인 */}
      <div
        className={classNames(
          'flex flex-col justify-between',
          'xs:col-span-2', // xs ~ lg
          'lg:col-span-3', // lg ~ xl
          'xxl:col-span-4', // xxl ~
        )}
      >
        {/* 제목&요약 */}
        <div className="flex flex-col gap-2">
          <div
            className={classNames(
              'py-1 px-2 md:px-4 bg-primaryLighter rounded-md',
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
            {formatDate(project.startDate!)} -{' '}
            {formatDate(project.releaseDate!)}
          </div>
          <SkillDisplay skills={project.skill!} small />
        </div>
      </div>
    </div>
  )
}
