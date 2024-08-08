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
    <div className="w-screen flex gap-2 p-10 mt-10">
      <div className="flex flex-col w-2/7 gap-4">
        <Contact />
        <History profile={profile} />
      </div>
      <div className="flex w-full">
        <Skills />
      </div>
    </div>
  )
}
