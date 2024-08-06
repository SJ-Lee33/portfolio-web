import Image, { StaticImageData } from 'next/image'
import { SkillList } from '@/const/skills'
import SkillIcon, { SkillItem } from '@/components/SkillIcon'

export default function Skills() {
  const Label = ({ title }: { title: string }) => {
    return (
      <div className="flex w-40 min-w-40 justify-center items-center bg-white font-extralight rounded-md text-title-s">
        {title}
      </div>
    )
  }

  /**
   * programming - 0~5
   * frontend - 5~12
   * backend - 12~16
   * design - 16~21
   * coorporation - 21~25
   */
  return (
    <div className="flex flex-col w-full p-4 gap-4 md:gap-2 bg-soft rounded-md">
      <div className="flex justify-center font-extrabold text-title-l">
        Skills & Tools
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-4 lg:gap-8">
          <Label title="Programming" />
          <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-5">
            {SkillList.slice(0, 5).map((item: SkillItem, index: number) => (
              <SkillIcon key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="flex gap-4 lg:gap-8">
          <Label title="FrontEnd" />

          <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-5">
            {SkillList.slice(5, 12).map((item: SkillItem, index: number) => (
              <SkillIcon key={index} item={item} />
            ))}
          </div>
        </div>
        <div className="flex gap-4 lg:gap-8">
          <Label title="BackEnd" />

          <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-5">
            {SkillList.slice(12, 16).map((item: SkillItem, index: number) => (
              <SkillIcon key={index} item={item} />
            ))}
          </div>
        </div>
        <div className="flex gap-4 lg:gap-8">
          <Label title="Design" />
          <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-5">
            {SkillList.slice(16, 21).map((item: SkillItem, index: number) => (
              <SkillIcon key={index} item={item} />
            ))}
          </div>
        </div>
        <div className="flex gap-4 lg:gap-8">
          <Label title="Coorporation" />
          <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-5">
            {SkillList.slice(21, 26).map((item: SkillItem, index: number) => (
              <SkillIcon key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
