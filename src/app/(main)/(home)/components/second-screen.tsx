'use client'

import Contact from './contact'
import Skills from './skills'
import History from './history'
import { useProfile } from '../../profile/hooks/use-profile'
import { LoadingSpinner } from '@/components/loading-spinner'
import classNames from 'classnames'

export default function SecondScreen() {
  const { profile, isLoading } = useProfile()
  if (isLoading) return <LoadingSpinner />

  return (
    <div
      className={classNames(
        'w-screen grid gap-5 p-10',
        'grid-cols-1', // sm ~ md
        'md:grid-cols-3', // md ~ lg
        'lg:grid-cols-4', // lg ~ xl
      )}
    >
      <div className="flex flex-col gap-4 mt-5">
        <Contact />
        <History profile={profile} />
      </div>
      <div
        className={classNames(
          'flex mt-5',
          '', // sm ~ md
          'md:col-span-2', // md ~ lg
          'lg:col-span-3', // lg ~ xl
        )}
      >
        <Skills />
      </div>
    </div>
  )
}
