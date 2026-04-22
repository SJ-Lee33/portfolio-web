import { RESUME_QUERYResult as Generated } from '@/sanity/types'
import Contact from './contact'
import backgroundImage from '/public/images/background.jpg'
import DownloadButton from './download_button'

export default function FirstScreen() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      {/* 경력기술서 다운로드 */}
      <DownloadButton url="/api/resume" />

      {/* 본문 */}
      <div
        className={`mx-auto max-w-mobile md:max-w-desktop h-full flex flex-col items-start justify-center md:flex-row md:justify-between md:items-center p-10`}
      >
        {/* 메인 문구 */}
        <div className="flex flex-col justify-center text-white font-extralight">
          <div className="text-title-l">IT 스타트업 - 제조업 업무경험</div>
          <div className="text-headline-m font-medium">
            전주기 책임 경험을 바탕으로
          </div>
          <div className="text-title-l">
            문제 정의와 구조 설계에 강점이 있습니다.
          </div>

          <div className="mt-10 text-[2.5rem]">
            <span className="font-bold text-[3.5rem] mr-4">이 소 진</span> Sojin
            Lee
          </div>
          <div className="flex flex-col text-title-m mt-5">
            무에서 유를 창조하며
            <div className="font-bold">
              사용자 여정 설계부터 운영 데이터 분석
            </div>
            Product 중심 기획/개발자
          </div>
        </div>

        {/* 연락처 */}
        <div className="mt-10 md:m-0">
          <Contact />
        </div>
      </div>
    </div>
  )
}
