import Contact from './contact'
import backgroundImage from '/public/images/background.jpg'

export default function FirstScreen() {
  return (
    <div
      className="h-screen w-screen flex flex-col items-start justify-center md:flex-row md:justify-between md:items-center px-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      {/* 메인 문구 */}
      <div className="flex flex-col justify-center text-[3rem] text-white font-extralight">
        <div>
          <span className="font-medium">회사의 비전</span>을 이해하고
        </div>
        <div>
          <span className="font-medium">개발의 다음</span>을 생각하는
        </div>
        <div>
          <span className="font-bold">개발자 이소진 입니다.</span>
        </div>
        <div className="text-title-m mt-5">
          제품에 대한 <b> 다각적 분석력</b>과 뛰어난
          <b> 업무 습득력</b>
          으로,
          <br />
          나무가 되어 동료와 함께 숲을 그리는
          <b> 고효율 개발자</b>
        </div>
      </div>

      {/* 연락처 */}
      <div className="mt-10 md:m-0">
        <Contact />
      </div>
    </div>
  )
}
