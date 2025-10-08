import classNames from 'classnames'
import { BsFillCaretRightFill } from 'react-icons/bs'

export default function PortableSubheader({ children }: { children: any }) {
  return (
    <div
      className={classNames(
        'flex gap-1 items-center bg-lemon bg-opacity-80',
        'px-4 md:px-10 py-1 mb-2 mt-[20px]',
        'text-title-m font-bold text-start',
      )}
    >
      <BsFillCaretRightFill /> {children}
    </div>
  )
}
