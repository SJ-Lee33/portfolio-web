import Contact from './contact'
import backgroundImage from '/public/images/background.jpg'

export default function FirstScreen() {
  return (
    <div
      className="min-h-screen w-screen flex flex-col items-start justify-center md:flex-row md:justify-between md:items-center p-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      {/* 메인 문구 */}
      <div className="flex flex-col justify-center text-[3rem] text-white font-extralight">
        <div>
          <span className="font-medium">실무 경험</span>이 풍부한
        </div>
        <div>
          <span className="font-medium">전천후 유틸리티</span>
        </div>
        <div>
          <span className="font-bold">개발자 이소진 입니다.</span>
        </div>
        <div className="text-title-m mt-5">
          다양한 프로젝트 경험으로
          <br />
          <b>개발 · 기획 · 운영 · 디자인 </b>까지 !
        </div>
      </div>

      {/* 연락처 */}
      <div className="mt-10 md:m-0">
        <Contact />
      </div>
    </div>
  )
}
