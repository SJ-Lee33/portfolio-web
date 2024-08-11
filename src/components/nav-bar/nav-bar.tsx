import DesktopNavBar from './desktop/desktop-nav-bar'

export default async function NavBar() {
  return (
    <div className="w-full fixed top-0 z-50">
      {/* TODO: 모바일 네비게이션 바 */}
      <div className="hidden sm:block">
        <DesktopNavBar />
      </div>
    </div>
  )
}
