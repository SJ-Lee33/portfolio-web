import { MENU, NAVIGATION_PATH } from '@/const/navigation'
import classNames from 'classnames'
import Link from 'next/link'

export default function DesktopNavBar() {
  const Chip = ({ value, scroll }: { value: string; scroll?: boolean }) => {
    return (
      <Link
        lang="en"
        href={value}
        scroll={scroll || false}
        className={classNames(
          'text-title-s font-extralight',
          'hover:text-primaryPressed hover:text-primary hover:font-extrabold',
        )}
      >
        <li>{MENU.find((menu) => menu.value === value)?.title}</li>
      </Link>
    )
  }

  return (
    <div
      className={`flex justify-between items-center h-[65px] px-10 mx-auto max-w-desktop `}
    >
      <nav className="flex items-center">
        <ul className="flex justify-center gap-8">
          <Chip value={NAVIGATION_PATH.profile} />
          <Chip value={NAVIGATION_PATH.project} />
          <Chip value={NAVIGATION_PATH.development} />
          <Chip value={NAVIGATION_PATH.design} />
          <Chip value={NAVIGATION_PATH.marketing} />
          <Chip value={NAVIGATION_PATH.study} scroll />
        </ul>
      </nav>
    </div>
  )
}
