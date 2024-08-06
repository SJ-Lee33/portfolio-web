import Contact from './contact'
import Skills from './skills'
import History from './history'

export default function SecondScreen() {
  return (
    <div className="w-screen flex gap-2 p-10">
      <div className="flex flex-col w-2/7 gap-4">
        <Contact />
        <History />
      </div>
      <div className="flex w-full">
        <Skills />
      </div>
    </div>
  )
}
