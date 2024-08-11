import DesktopNavBar from './desktop/desktop-nav-bar'
import MobileNavBar from './mobile/mobile-nav-bar'

export default async function NavBar() {
  return (
    <div className="w-full">
      <div className="block md:hidden">
        <MobileNavBar />
      </div>
      <div className="hidden md:block">
        <DesktopNavBar />
      </div>
    </div>
  )
}
