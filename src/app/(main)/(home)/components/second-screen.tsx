'use client'

import Contact from './contact'
import Skills from './skills'
import History from './history'
import { useProfile } from '../../profile/hooks/use-profile'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function SecondScreen() {
  const { profile, isLoading } = useProfile()
  if (isLoading) return <LoadingSpinner />

  return (
    <div className="w-screen grid grid-cols-4 gap-5 p-10">
      <div className="flex flex-col gap-4 mt-5">
        <Contact />
        <History profile={profile} />
      </div>
      <div className="flex w-full col-span-3 mt-5">
        <Skills />
      </div>
    </div>
  )
}
