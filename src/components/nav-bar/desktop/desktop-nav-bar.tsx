'use client'
import { MENU, NAVIGATION_PATH } from '@/const/navigation'
import classNames from 'classnames'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DesktopNavBar() {
  const selectedSegment = useSelectedLayoutSegment()

  const Chip = ({ value }: { value: string }) => {
    return (
      <Link
        href={value}
        className={classNames(
          'text-title-s hover:text-primaryPressed',
          'hover:text-primary',
          `/${selectedSegment}` === value
            ? 'font-bold border-b-2 border-primaryPressed'
            : 'font-medium',
        )}
      >
        <li>{MENU.find((menu) => menu.value === value)?.title}</li>
      </Link>
    )
  }

  return (
    <nav className="flex items-center h-10 px-12 bg-white">
      <ul className="flex justify-center gap-10">
        <Chip value={NAVIGATION_PATH.profile} />
        <Chip value={NAVIGATION_PATH.project} />
        <Chip value={NAVIGATION_PATH.developer} />
        <Chip value={NAVIGATION_PATH.designer} />
        <Chip value={NAVIGATION_PATH.marketer} />
      </ul>
    </nav>
  )
}
