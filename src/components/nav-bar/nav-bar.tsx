import DesktopNavBar from './desktop/desktop-nav-bar'
import MobileNavBar from './mobile/mobile-nav-bar'

export default function NavBar({
  shownLogo,
  headerDesign,
}: {
  shownLogo?: boolean
  headerDesign?: string
}) {
  return (
    <div
      className={`w-full fixed top-0 z-50 transition-colors duration-500 ${headerDesign}`}
    >
      <div className="block md:hidden">
        <MobileNavBar shownLogo={shownLogo} />
      </div>
      <div className="hidden md:block">
        <DesktopNavBar shownLogo={shownLogo} />
      </div>
    </div>
  )
}
