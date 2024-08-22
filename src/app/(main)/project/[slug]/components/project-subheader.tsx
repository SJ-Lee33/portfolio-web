import classNames from 'classnames'
import { BsFillCaretRightFill } from 'react-icons/bs'

export default function ProjectSubheader({
  children,
  color,
}: {
  children: any
  color?: 'red' | 'blue'
}) {
  return (
    <div
      className={classNames(
        'flex gap-1 items-center bg-neutralLighter/70 px-4 md:px-10 py-1 mb-2 mt-[50px] text-title-m font-bold text-start',
        color == 'red' && 'text-red mt-[60px]',
        color == 'blue' && 'text-primary mt-8',
      )}
    >
      <BsFillCaretRightFill /> {children}
    </div>
  )
}
