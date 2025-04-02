interface WorkProps {
  job: string
  company: string
  period: string
  summary: string[]
}

export default function WorkScreen() {
  const WORKS: WorkProps[] = [
    {
      job: 'FE 개발 | QC | 마케팅 · 기획',
      company: '(주)INNOS / 중견 제조업',
      period: '2024.08 - 2025.05 (10개월)',
      summary: [
        '웹사이트 UI/UX 기획 · FE 개발',
        '마케팅 · 홍보 자산 개발 [사업계획서, 브로슈어 등]',
        'HW 및 게임SW 버그 테스트, 오류/개선 사항 도출',
        'YOUTUBE 홍보 채널 기획 및 개발',
      ],
    },
    {
      job: 'FE 개발 | UI/UX 디자인 | 마케팅 · 기획 | 운영',
      company: '(주)이루티 / 스타트업',
      period: '2022.06 - 2024.05 (2년)',
      summary: [
        '웹 플랫폼 솔루션 기획 → 개발 → 운영 A to Z',
        'Next.js + Typescript 기반 프론트엔드 개발 주도',
        '미디어 재생을 위한 Android TV용 애플리케이션 개발',
        'SNS 마케팅, 오프라인 세일즈, CS 및 서비스 운영',
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
