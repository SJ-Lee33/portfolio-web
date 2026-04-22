import classNames from 'classnames'
import { BsFillCaretRightFill } from 'react-icons/bs'

export default function PortableSubheader({ children }: { children: any }) {
  return (
    <div className="flex items-center gap-1 text-title-s font-extrabold pt-[10px] pb-[5px]">
      <BsFillCaretRightFill /> {children}
    </div>
  )
}
