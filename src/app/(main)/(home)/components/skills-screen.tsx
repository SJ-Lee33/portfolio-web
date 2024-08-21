import Skills from './skills'

export default function SkillsScreen() {
  return (
    <div className="flex flex-col md:flex-row p-12 gap-10 text-neutral">
      <div className="flex flex-col gap-5">
        {/* 제목 */}
        <div className="text-headline-l font-extrabold">Skills & Tools</div>
        <div className="text-body-m">
          <p className="font-bold">#개발자 #디자이너 #마케터</p>
          <p>다양한 분야의 업무 경험을 가지고 있습니다.</p>
        </div>
      </div>

      {/* 박스 */}
      <Skills />
    </div>
  )
}
