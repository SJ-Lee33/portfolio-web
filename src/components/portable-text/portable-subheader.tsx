import classNames from 'classnames'
import { BsFillCaretRightFill } from 'react-icons/bs'

export default function PortableSubheader({ children }: { children: any }) {
  return (
    <div className="w-full mb-[20px] mt-[40px] text-title-s font-extrabold text-start">
      <div className="flex items-center gap-1">
        <BsFillCaretRightFill /> {children}
      </div>
      <div className="h-[1.5px] bg-neutralLighter mt-2" />
    </div>
  )
}
