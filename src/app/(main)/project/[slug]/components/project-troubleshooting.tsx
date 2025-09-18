import dynamic from 'next/dynamic'
import Portable from '@/components/portable-text/portable-text-component'

export default function ProjectTroubleShooting({
  index,
  title,
  content,
}: {
  index: number
  title: string
  content: []
}) {
  return (
    <div key={index} className="bg-neutralLighter mt-[60px] px-5 py-8">
      {/* 타이틀 */}
      <div className="text-title-l font-bold text-start text-red md:px-5 -mb-5">
        {'[ 문제 ' + index + ' ] ' + title}
      </div>

      {/* 내용 */}
      <Portable value={content} />
    </div>
  )
}
