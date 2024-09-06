'use client'

import History from './history'
import { useHistory } from '../../profile/hooks/use-history'
import { LoadingSpinner } from '@/components/loading-spinner'
interface WorkProps {
  job: string
  company: string
  period: string
  summary: string[]
}

export default function WorkScreen() {
  const WORKS: WorkProps[] = [
    {
      job: 'Developer & Designer & Marketer & Service Operator',
      company: 'IRUTI inc.',
      period: '2022.07 - 2024.08 (2년 1개월)',
      summary: [
        '미술 관련 플랫폼 솔루션을 개발해 매출 달성',
        '요구사항에 맞는 새로운 기술을 도입해 빠르고 안정적인 기획 및 개발',
        '체크리스트를 작성해 단위 테스트 실행 및 유지보수 진행',
        '실제 고객과 소통하며 SNS 마케팅 및 서비스 운영',
      ],
    },
    {
      job: 'Designer & Marketer',
      company: 'INNOS inc.',
      period: '2024.08 - 2024.09 (1개월)',
      summary: [
        '디지털 낚시 아케이드 팝업 부스 준비 및 홍보물 제작',
        '광고판촉 채널 조사, 디자인 및 제작',
        '홈페이지 UI/UX 디자인',
      ],
    },
  ]

  const WorkItem = ({ work }: { work: WorkProps }) => {
    return (
      <div className="flex flex-col gap-3 my-10 ">
        {/* 제목 */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          {/* 좌 */}
          <div className="font-bold">
            <span className="text-title-m">{work.job}</span>
            <span className="text-body-m"> - {work.company}</span>
          </div>

          {/* 우 */}
          <div className="text-body-s">{work.period}</div>
        </div>

        {/* 내용 */}
        <ul className="text-body-m px-4">
          {work.summary.map((content, index) => (
            <li key={index} style={{ listStyleType: 'disc' }}>
              {content}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div className="p-12 text-neutral">
      {/* 제목 */}
      <div className="text-headline-l font-extrabold">Work Experience</div>

      {/* 내용 */}
      {WORKS.map((work, index) => (
        <WorkItem work={work} key={index} />
      ))}
    </div>
  )
}
