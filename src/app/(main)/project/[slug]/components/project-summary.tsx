import SkillDisplay from '@/components/skill-display'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'

export default async function ProjectSummary({
  thumbnail,
  role,
  contribution,
  skill,
  startDate,
  releaseDate,
  duration,
  updatedAt,
}: {
  thumbnail: string
  role: string
  contribution: string
  skill?: string[]
  startDate: string
  releaseDate: string
  duration: string
  updatedAt: string
}) {
  let skillsList = '-'
  if (skill) skillsList = Object.values(skill).join(', ')

  const Title = ({ title }: { title: string }) => {
    return (
      <div className="font-semibold border-r-[1.5px] border-neutralLight/50 min-w-[40px]">
        {title}
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row w-full h-auto rounded-b-md items-center lg:items-start justify-center gap-10 px-[80px] pt-[80px] ">
      {/* 썸네일 */}
      <div className="mr-0 lg:mr-10 mb-10 lg:mb-0">
        <div className="text-body-s text-right font-light mb-3 mr-1">
          최근수정일: {` ${formatDate(updatedAt, { day: true })}`}
        </div>
        <Image
          src={thumbnail}
          alt="project thumbnail"
          width={400}
          height={400}
          className="w-[400px] h-auto object-contain shadow-xl shadow-neutralLight/30 rounded-md"
        />
      </div>
      {/* 구분선 - 모바일일 때만 */}
      <div className="block lg:hidden w-full h-[1px] bg-neutralLight/50" />
      {/* 요약 */}
      <div className="flex flex-col gap-3 text-body-m font-light lg:py-3 ">
        <div className="flex gap-2.5">
          <Title title="역할" />
          {role}
        </div>
        <div className="flex gap-2.5">
          <Title title="기여" />
          {contribution}
        </div>
        <div className="flex gap-2.5">
          <Title title="기간" />
          {` ${formatDate(startDate)} - ${formatDate(releaseDate)} (${duration})`}
        </div>
        <div className="flex gap-2.5">
          <Title title="기술" />
          <div className="flex flex-col gap-2">
            {skillsList} <SkillDisplay skills={skill} small />
          </div>
        </div>
      </div>
    </div>
  )
}
