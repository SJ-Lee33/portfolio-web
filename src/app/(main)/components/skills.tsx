import Image, { StaticImageData } from 'next/image'
import { SkillList } from '@/const/skills'

type SkillItem = {
  icon: StaticImageData
  title: string
}

export default function Skills() {
  const Label = ({ title }: { title: string }) => {
    return (
      <div className="flex w-40 min-w-40 justify-center items-center bg-white font-extralight rounded-md text-title-s">
        {title}
      </div>
    )
  }
  const Icon = ({ item }: { item: SkillItem }) => {
    return (
      <div className="relative flex flex-col items-center group">
        <Image
          className="h-[65px] object-contain"
          src={item.icon}
          alt={item.title}
          width={65}
          height={65}
        />
        <div className="absolute bottom-0 left-1/2 h-full w-full flex justify-center items-center text-center transform -translate-x-1/2 bg-neutral text-white text-body-s rounded-md opacity-0 group-hover:opacity-80 transition-opacity duration-300">
          {item.title}
        </div>
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
              <Icon key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="flex gap-4 lg:gap-8">
          <Label title="FrontEnd" />

          <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-5">
            {SkillList.slice(5, 12).map((item: SkillItem, index: number) => (
              <Icon key={index} item={item} />
            ))}
          </div>
        </div>
        <div className="flex gap-4 lg:gap-8">
          <Label title="BackEnd" />

          <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-5">
            {SkillList.slice(12, 16).map((item: SkillItem, index: number) => (
              <Icon key={index} item={item} />
            ))}
          </div>
        </div>
        <div className="flex gap-4 lg:gap-8">
          <Label title="Design" />
          <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-5">
            {SkillList.slice(16, 21).map((item: SkillItem, index: number) => (
              <Icon key={index} item={item} />
            ))}
          </div>
        </div>
        <div className="flex gap-4 lg:gap-8">
          <Label title="Coorporation" />
          <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-5">
            {SkillList.slice(21, 26).map((item: SkillItem, index: number) => (
              <Icon key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
