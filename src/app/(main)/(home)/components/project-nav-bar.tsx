'use client'

import { useTypeSearchParam } from '@/app/(main)/project/hooks/use-type-search-param'
import classNames from 'classnames'
import Link from 'next/link'

export default function ProjectNavBar() {
  const type = useTypeSearchParam()

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
          'text-body-m text-neutral font-normal',
          'hover:bg-primary hover:text-white hover:font-bold',
          isActive && 'bg-primary text-white font-bold',
        )}
      >
        {children}
      </Link>
    )
  }
  return (
    <ul
      className={classNames(
        'flex items-center',
        'text-title-s bg-white rounded-full',
        'border border-neutralLight',
        'gap-3',
        'min-h-[40px]',
      )}
    >
      <NavLink href="/project" isActive={!type}>
        <li>전체</li>
      </NavLink>
      <NavLink
        href="/project?type=development"
        isActive={type === 'development'}
      >
        <li>개발</li>
      </NavLink>
      <NavLink href="/project?type=design" isActive={type === 'design'}>
        <li>디자인</li>
      </NavLink>
      <NavLink href="/project?type=marketing" isActive={type === 'marketing'}>
        <li>마케팅</li>
      </NavLink>
    </ul>
  )
}
