interface WorkProps {
  job: string
  company: string
  period: string
  desc: string
  summary: string[]
}

export default function WorkScreen() {
  const WORKS: WorkProps[] = [
    {
      job: 'FE 개발 / QA / 브랜딩',
      company: '(주)이노스',
      period: '2024.08 – 2025.05 · 10개월',
      desc: "디지털 낚시 아케이드 'Strong Fisher' — HW-SW 통합 환경",
      summary: [
        '**이벤트 로그 수집 구조 설계** → HW 컨트롤러 중복 입력 원인 규명 → 오류율 80% 이상 감소',
        '**시나리오 기반 테스트 체계 수립** → 테스트 시간 30% 단축, 양산 전 품질 기준 정립',
        '외주 개발사와 코드 레벨 협업 — SW·HW 공통 기준 정립으로 블랙스크린 원인 (비동기 처리 오류) 규명',
        '제품 홍보 웹서비스 기획 — IA 설계 · Figma 프로토타입 · 외주 QA 수행 → 오프라인 전시 지원',
        '브랜드 자산 일관성 구조 설계 — 브로슈어 · 배너 · 영상 콘텐츠 제작',
      ],
    },
    {
      job: '웹 개발 / 운영 / 기획',
      company: '(주)이루티',
      period: '2022.06 – 2024.05 · 2년',
      desc: "미술전시·판매 플랫폼 '아트라운지' — 기획부터 운영까지",
      summary: [
        '**React SPA → Next.js SSR 전환**, TypeScript 마이그레이션 → SEO 유입 개선 · 런타임 오류 제거',
        '**Firebase → Headless CMS(Sanity) 전환** — 콘텐츠·로직 분리, Cloudinary 스토리지 분산 → 자원 사용량 70% 감소',
        '**CI/CD 구축** (Vercel + GitHub Actions) → 수동 배포 제거, 배포 안정성 확보',
        '고객 문의 분석 · 채널톡 운영 자동화 → CS 대응 체계 구축',
        '사용자 행동 기반 UI 개선, 전시 공간 발굴 · 현장 운영 → **공간 제휴 30건, 전시 32건, SNS 성장 300%**',
      ],
    },
  ]

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  const WorkItem = ({ work }: { work: WorkProps }) => {
    return (
      <div className="flex flex-col gap-3 my-10 ">
        {/* 제목 */}
        <div className="flex flex-col gap-2 ">
          {/* 좌 */}
          <div className="">
            <span className="text-title-m font-bold">{work.job}</span>
            <span className="text-body-m"> · {work.company}</span>
          </div>

          {/* 우 */}
          <div className="text-body-s font-light">{work.period}</div>
        </div>

        {/* 내용 */}
        <ul className="text-body-m px-4">
          {work.summary.map((content, index) => (
            <li
              key={index}
              style={{ listStyleType: 'disc' }}
              className="mb-0.5"
            >
              {renderText(content)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div className={`p-12 text-neutral mx-auto max-w-mobile md:max-w-desktop `}>
      {/* 제목 */}
      <div className="text-headline-l font-extrabold">Work Experience</div>

      {/* 내용 */}
      {WORKS.map((work, index) => (
        <WorkItem work={work} key={index} />
      ))}
    </div>
  )
}
