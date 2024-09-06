import SkillDisplay from '@/components/skill-display'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'

export default async function ProjectSummary({
  thumbnail,
  role,
  contribution,
  skill,
  releaseDate,
  duration,
}: {
  thumbnail: string
  role: string
  contribution: string
  skill?: string[]
  releaseDate: string
  duration: string
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
    <div className="flex flex-col md:flex-row w-full h-auto rounded-b-md items-center md:items-start justify-center gap-10 px-[80px] pt-[80px] ">
      {/* 썸네일 */}
      <Image
        src={thumbnail}
        alt="project thumbnail"
        width={400}
        height={400}
        className="w-[400px] h-auto object-contain mr-0 md:mr-10 mb-10 md:mb-0 shadow-xl shadow-neutralLight/30 rounded-md"
      />
      {/* 구분선 - 모바일일 때만 */}
      <div className="block md:hidden w-full h-[1px] bg-neutralLight/50" />
      {/* 요약 */}
      <div className="flex flex-col gap-3 text-body-m font-light md:py-3 ">
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
          {` ${formatDate(releaseDate)} (${duration})`}
        </div>
        {/* <div className="flex flex-col w-auto gap-3 mt-5">
          <p className="font-semibold border-b pb-2 border-neutralLight/50">
            기술
          </p>
          <SkillDisplay skills={skill} />
      </div> */}
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
