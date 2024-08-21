import Skills from './skills'

export default function SkillsScreen() {
  return (
    <div className="flex flex-col md:flex-row p-12 gap-10 text-neutral">
      {/* 제목 */}
      <div className="text-headline-l font-extrabold">Skills & Tools</div>
      {/* 박스 */}
      <Skills />
    </div>
  )
}
