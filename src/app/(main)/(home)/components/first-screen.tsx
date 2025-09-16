import Contact from './contact'
import backgroundImage from '/public/images/background.jpg'

export default function FirstScreen() {
  return (
    <div
      className="min-h-screen w-screen flex flex-col items-start justify-center md:flex-row md:justify-between md:items-center p-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      {/* 메인 문구 */}
      <div className="flex flex-col justify-center text-white font-extralight">
        <div className="text-title-l">IT 스타트업 - 제조업 업무경험</div>
        <div className="text-headline-m font-medium">
          고객을 위한 개발을 합니다.
        </div>

        <div className="mt-10 text-[2.5rem]">
          <span className="font-bold text-[3.5rem] mr-4">이 소 진</span> Sojin
          Lee
        </div>
        <div className="text-title-m mt-5">
          <span className="font-bold mr-3">개발 · 기획 · 운영 · 디자인 </span>
          다양한 프로젝트 경험 보유
        </div>
      </div>

      {/* 연락처 */}
      <div className="mt-10 md:m-0">
        <Contact />
      </div>
    </div>
  )
}
