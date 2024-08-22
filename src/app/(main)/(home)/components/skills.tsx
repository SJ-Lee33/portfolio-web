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
   * frontend - 5~15
   * backend - 16~19
   * design - 19~24
   * coorporation - 24~28
   */
  return (
    <div className="flex w-full flex-col gap-10 p-4 mt-3 bg-neutralLighter/80 rounded-md">
      <Container title="PROGRAMMING" start={0} end={5} />
      <Container title="WEB & APP" start={5} end={15} />
      <Container title="DATA" start={16} end={19} />
      <Container title="DESIGN" start={19} end={24} />
      <Container title="COORPORATION" start={24} end={29} />
    </div>
  )
}
