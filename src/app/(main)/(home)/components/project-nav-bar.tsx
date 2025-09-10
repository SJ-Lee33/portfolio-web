'use client'

import { ProjectType } from '@/sanity/schemaTypes/const/projectType'
import classNames from 'classnames'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ProjectNavBar() {
  const sp = useSearchParams()
  const projectType = sp.get('projectType') as ProjectType | null

  const NavLink = ({
    href,
    children,
    isActive,
  }: {
    href: string
    children: React.ReactNode
    isActive: boolean
  }) => {
    return (
      <Link
        href={href}
        className={classNames(
          'flex-1 justify-center text-center',
          'w-full py-4 rounded-full',
          'text-neutral',
          'text-body-m md:text-title-s',
          'hover:bg-primaryDark hover:text-white hover:font-extrabold',
          'focus:bg-primaryDarker',
          isActive && 'bg-primary text-white font-extrabold',
        )}
        scroll={false}
      >
        {children}
      </Link>
    )
  }
  return (
    <ul
      className={classNames(
        'flex items-center mb-8',
        'text-title-s bg-white rounded-full',
        'border border-neutralLight',
        'gap-3',
        'min-h-[40px]',
      )}
    >
      <NavLink href="/project" isActive={!projectType}>
        <li>전체</li>
      </NavLink>
      <NavLink
        href="/project?projectType=development"
        isActive={projectType === 'development'}
      >
        <li>개발</li>
      </NavLink>
      <NavLink
        href="/project?projectType=design"
        isActive={projectType === 'design'}
      >
        <li>디자인</li>
      </NavLink>
      <NavLink
        href="/project?projectType=marketing"
        isActive={projectType === 'marketing'}
      >
        <li>마케팅</li>
      </NavLink>
    </ul>
  )
}
