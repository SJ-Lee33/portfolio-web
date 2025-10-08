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
      <div className="flex flex-col gap-5 p-4 hover:text-primary hover:bg-soft/80 duration-300">
        <Label title={title} />
        <div className="flex flex-wrap justify-start items-center gap-2 md:gap-4">
          <SkillDisplay skills={skills} />
        </div>
      </div>
    )
  }

  /**
   * programming - 0~6
   * frontend - 6~19
   * backend - 19~22
   * design - 22~27
   * document - 27~31
   * cooperation - 31~35
   */
  return (
    <div className="flex w-full flex-col gap-10 p-4 mt-3 bg-neutralLighter/80 rounded-md">
      <Container title="PROGRAMMING" start={0} end={6} />
      <Container title="WEB & APP" start={6} end={19} />
      <Container title="DATA" start={19} end={22} />
      <Container title="DESIGN" start={22} end={27} />
      <Container title="DOCUMENT" start={27} end={31} />
      <Container title="COOPERATION" start={31} end={35} />
    </div>
  )
}
