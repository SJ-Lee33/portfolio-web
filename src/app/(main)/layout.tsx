import NavBar from '@/components/nav-bar/nav-bar'

type Props = {
  children: React.ReactNode
}

export default async function ClientLayout({ children }: Props) {
  return (
    <div className="w-screen z-50">
      <header>
        <NavBar />
      </header>

      <main className="mt-12">{children}</main>
    </div>
  )
}
