import Image from 'next/image'
import downArrow from '/public/images/down-arrow.gif'

export default function FirstScreen() {
  return (
    <div className="h-screen w-screen relative ">
      <div className="w-full px-5 absolute bottom-0">
        <div className="text-[3.8rem]">
          <span className="font-black">개발의 다음</span>을 생각하는 개발자
        </div>
        <div className="text-[3.2rem] -mt-3">이소진 입니다</div>
        <div className="text-title-m mt-5 px-2">
          제품에 대한 <span className="font-black"> 다각적 분석력</span>과
          뛰어난
          <span className="font-black"> 업무 습득력</span>
          으로, 나무가 되어 동료와 함께 숲을 그리는
          <span className="font-black"> 고효율 개발자</span>
          입니다.
        </div>
        <div className="w-full flex justify-center">
          <Image
            className="w-[160px] h-[160px] rounded-full"
            src={downArrow}
            alt="Please Scroll Down!"
          />
        </div>
      </div>
    </div>
  )
}
