import NavBar from '@/components/nav-bar/nav-bar'

type Props = {
  children: React.ReactNode
}

export default async function ClientLayout({ children }: Props) {
  return (
    <div className="w-screen z-50">
      <header className="w-full fixed top-0 z-50">
        <NavBar />
      </header>

      <main className="mt-[90px]">{children}</main>
    </div>
  )
}
