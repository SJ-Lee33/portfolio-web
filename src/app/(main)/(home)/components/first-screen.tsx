import Contact from './contact'
import backgroundImage from '/public/images/background.jpg'
import Link from 'next/link'

export default function FirstScreen() {
  const Chip = ({
    title,
    href,
    color,
  }: {
    title: string
    href: string
    color: string
  }) => {
    return (
      <Link
        className={`w-[80px] h-[80px] rounded-full font-bold text-body-m text-center flex justify-center items-center bg-white/70 hover:bg-white text-${color}`}
        href={href}
      >
        {title}
      </Link>
    )
  }
  return (
    <div
      className="h-screen w-screen grid px-10 grid-cols-3 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      {/* 메인 문구 */}
      <div className="flex flex-col col-span-2 justify-center text-[3.5rem] text-white font-extralight">
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

      <div className="flex justify-end items-center">
        <Contact />
      </div>
    </div>
  )
}
