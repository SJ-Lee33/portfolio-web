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
   * programming - 0~5
   * frontend - 5~17
   * backend - 17~21
   * design - 21~26
   * document - 26~30
   * cooperation - 30~34
   */
  return (
    <div className="flex w-full flex-col gap-10 p-4 mt-3 bg-neutralLighter/80 rounded-md">
      <Container title="PROGRAMMING" start={0} end={5} />
      <Container title="WEB & APP" start={5} end={17} />
      <Container title="DATA" start={17} end={21} />
      <Container title="DESIGN" start={21} end={26} />
      <Container title="DOCUMENT" start={26} end={30} />
      <Container title="COOPERATION" start={30} end={34} />
    </div>
  )
}
