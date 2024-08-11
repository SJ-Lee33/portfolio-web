import { MENU, NAVIGATION_PATH } from '@/const/navigation'
import classNames from 'classnames'
import Link from 'next/link'
import Logo from '../logo'

export default function MobileNavBar() {
  const Chip = ({ value }: { value: string }) => {
    return (
      <Link
        href={value}
        className={classNames(
          'text-body-m font-extralight text-neutral',
          'hover:text-primaryPressed hover:text-primary hover:font-bold',
        )}
      >
        <li>{MENU.find((menu) => menu.value === value)?.title}</li>
      </Link>
    )
  }

  return (
    <div className="flex flex-col justify-center">
      <Logo />
      <nav className="flex items-center justify-center h-10 bg-white shadow-md shadow-neutralLight/5">
        <ul className="flex gap-10">
          <Chip value={NAVIGATION_PATH.profile} />
          <Chip value={NAVIGATION_PATH.project} />
        </ul>
      </nav>
    </div>
  )
}
