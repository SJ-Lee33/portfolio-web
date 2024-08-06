import ProjectDetailPage from './ProjectDetailPage'

type Props = {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const temp = [{ title: 'hello' }]
  return <ProjectDetailPage id={params.slug} project={temp} />
}
