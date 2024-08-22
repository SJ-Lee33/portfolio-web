import SkillDisplay from '@/components/skill-display'
import { SkillList } from '@/const/skills'

export default function Skills() {
  const Label = ({ title }: { title: string }) => {
    return (
      <div className="flex pb-2 font-bold text-title-m border-b border-primaryLight">
        # {title}
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
    const skills = SkillList.slice(start, end).map((item) => item.title)
    return (
      <div className="flex flex-col gap-5 p-4 hover:text-primary hover:bg-soft/80">
        <Label title={title} />
        <div className="flex flex-wrap justify-start items-center gap-2 md:gap-4">
          <SkillDisplay skills={skills} />
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
    <div className="flex w-full flex-col gap-10 p-4 mt-3 bg-neutralLighter/80 rounded-md">
      <Container title="PROGRAMMING" start={0} end={5} />
      <Container title="WEB & APP" start={5} end={12} />
      <Container title="DATA" start={12} end={16} />
      <Container title="DESIGN" start={16} end={21} />
      <Container title="COORPORATION" start={21} end={26} />
    </div>
  )
}
