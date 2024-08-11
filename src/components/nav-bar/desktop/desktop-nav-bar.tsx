import { MENU, NAVIGATION_PATH } from '@/const/navigation'
import classNames from 'classnames'
import Link from 'next/link'
import Logo from '../logo'

export default function DesktopNavBar() {
  const Chip = ({ value }: { value: string }) => {
    return (
      <Link
        href={value}
        className={classNames(
          'text-title-s font-extralight text-neutral',
          'hover:text-primaryPressed hover:text-primary hover:font-extrabold',
        )}
      >
        <li>{MENU.find((menu) => menu.value === value)?.title}</li>
      </Link>
    )
  }

  return (
    <div className="flex justify-between items-center h-[65px] px-10 bg-white shadow-md shadow-neutral/5">
      <Logo horizontal />
      <nav className="flex items-center">
        <ul className="flex justify-center gap-8">
          <Chip value={NAVIGATION_PATH.profile} />
          <Chip value={NAVIGATION_PATH.project} />
          <Chip value={NAVIGATION_PATH.developer} />
          <Chip value={NAVIGATION_PATH.designer} />
          <Chip value={NAVIGATION_PATH.marketer} />
        </ul>
      </nav>
    </div>
  )
}
