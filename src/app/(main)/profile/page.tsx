import HomePage from '../(home)/home-page'
export const dynamic = 'force-dynamic'

export default function Page() {
  return <HomePage projectType={null} autoScrollTo="profile" />
}
