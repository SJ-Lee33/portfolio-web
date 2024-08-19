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
  if (skill) skillsList = Object.values(skill).join(' / ')

  return (
    <div className="flex flex-col md:flex-row w-full rounded-b-md items-center md:items-start justify-center gap-5 px-5 pt-[80px]">
      {/* 썸네일 */}
      <Image
        src={thumbnail}
        alt="project thumbnail"
        width={400}
        height={400}
        className="w-[400px] h-auto object-contain"
      />

      <div className="flex flex-col gap-1 text-body-m font-light py-3">
        <div>
          <span className="font-semibold">역할 |</span> {role}
        </div>
        <div>
          <span className="font-semibold">기여 |</span> {contribution}
        </div>
        <div>
          <span className="font-semibold">기술 |</span> {skillsList}
        </div>
        <div>
          <span className="font-semibold">기간 |</span>
          {` ${formatDate(releaseDate)} (${duration})`}
        </div>
      </div>
    </div>
  )
}
