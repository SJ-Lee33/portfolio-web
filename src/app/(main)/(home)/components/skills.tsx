import SkillIcon, { SkillItem } from '@/components/skill-icon'
import { SkillList } from '@/const/skills'

export default function Skills() {
  const Label = ({ title }: { title: string }) => {
    return (
      <div className="flex w-40 min-w-40 justify-center items-center bg-white font-extralight rounded-md text-title-s">
        {title}
      </div>
    )
  }
  const Container = ({
    title,
    start,
    end,
  }: {
    title: string
    start: number
    end: number
  }) => {
    return (
      <div className="flex gap-4 lg:gap-8">
        <Label title={title} />
        <div className="flex flex-wrap justify-start items-center gap-2 lg:gap-7">
          {SkillList.slice(start, end).map((item: SkillItem, index: number) => (
            <SkillIcon key={index} item={item} />
          ))}
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
        <Container title="Programming" start={0} end={5} />
        <Container title="FrontEnd" start={5} end={12} />
        <Container title="BackEnd" start={12} end={16} />
        <Container title="Design" start={16} end={21} />
        <Container title="Coorporation" start={21} end={26} />
      </div>
    </div>
  )
}
