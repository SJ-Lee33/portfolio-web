import Contact from './contact'
import Skills from './skills'
import History from './history'
import { useProfile } from '@/app/profile/hooks/use-profile'

export default function SecondScreen() {
  const { profile, error } = useProfile()

  return (
    <div className="w-screen flex gap-2 p-10">
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
