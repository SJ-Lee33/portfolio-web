import SkillIcon from '@/components/SkillIcon'
import { SkillList } from '@/const/skills'

export default function ProjectItem() {
  return (
    <div className="flex gap-3 min-h-[150px] hover:bg-soft p-4">
      <div className="relative w-1/4">
        <div
          className={`z-10 absolute top-2 left-2 py-1 px-2 text-body-s flex items-center bg-white text-neutral rounded-md font-semibold`}
        >
          개발
        </div>
        {/* 이미지  */}
        <div className="w-full h-full bg-primary rounded-md" />
      </div>

      <div className="flex flex-col gap-4">
        {/* 제목&부제목 */}
        <div className="flex flex-col">
          <div className="text-title-l font-extrabold">
            독학 Unity 3D 게임 개발, 사용자 환경에 맞춘 Web GL 배포
          </div>
          <div className="text-body-m">
            흥미로 시작한 개발, 성공적 배포와 성과가 관련 수업 수강으로
            이어졌습니다.
          </div>
        </div>

        {/* 출시일&기술스택 */}
        <div className="flex flex-col gap-2">
          <div className="text-body-s text-neutralLight">Jun, 2022</div>
          <div className="flex flex-wrap gap-2 items-center">
            <SkillIcon item={SkillList[0]} small />
            <SkillIcon item={SkillList[1]} small />
            <SkillIcon item={SkillList[2]} small />
          </div>
        </div>
      </div>
    </div>
  )
}
