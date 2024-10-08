import React from 'react'
import SkillIcon from './skill-icon'
import { SkillList } from '@/const/skills'

export default function SkillDisplay({
  skills,
  small,
}: {
  skills?: string[]
  small?: boolean
}) {
  const getSkillItem = (title: string) => {
    return SkillList.find((skill) => skill.title === title)
  }
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {skills?.map((skillTitle) => {
        const skillItem = getSkillItem(skillTitle)
        if (skillItem) {
          return <SkillIcon key={skillTitle} item={skillItem} small={small} />
        }
        return null
      })}
    </div>
  )
}
