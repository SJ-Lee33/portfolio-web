'use client'

import classNames from 'classnames'
import Link from 'next/link'

//TODO: 메뉴에 따른 링크이동

export default function ProjectNavBar() {
  // const type = useStatusSearchParam()
  const type = 'temp'
  const NavLink = ({
    href,
    children,
  }: // isActive,
  {
    href: string
    children: React.ReactNode
    // isActive: boolean
  }) => {
    return (
      <Link
        href={href}
        className={classNames(
          'flex-1 justify-center text-center',
          'w-full py-4 rounded-full',
          'text-body-m text-neutral font-normal',
          'hover:bg-primary hover:text-white hover:font-bold',

          // isActive
          //   ? 'font-bold border-primary'
          //   : 'font-normal border-transparent',
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
      <NavLink
        href="/"
        // isActive={!type}
      >
        <li>전체</li>
      </NavLink>
      <NavLink
        href=""
        // isActive={type === 'development'}
      >
        <li>개발</li>
      </NavLink>
      <NavLink
        href=""
        // isActive={type === 'marketing'}
      >
        <li>마케팅</li>
      </NavLink>
      <NavLink
        href=""
        // isActive={type === 'design'}
      >
        <li>디자인</li>
      </NavLink>
    </ul>
  )
}
