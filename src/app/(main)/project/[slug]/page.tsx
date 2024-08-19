import ProjectHeader from './components/project-header'
import ProjectSummary from './components/project-summary'
import ProjectTitle from './components/project-title'
import ProjectTypeLabel from '../../(home)/components/project-type-label'
import { PortableText } from 'next-sanity'
import ProjectPlanetext from './components/project-plaintext'
import ProjectImage from './components/project-image'
import ProjectCodebox from './components/project-codebox'
import { getProjectById } from '@/hooks/get-project-by-id'
import { LoadingSpinner } from '@/components/loading-spinner'
import ProjectListitems from './components/project-listitems'
import ProjectSubheader from './components/project-subheader'

type Props = {
  params: {
    slug: string
  }
}

export default async function Page({ params: { slug } }: Props) {
  const project = await getProjectById(slug)

  const components: any = {
    block: {
      h3: ({ children }: { children: any }) => (
        <ProjectHeader>{children}</ProjectHeader>
      ),
      h4: ({ children }: { children: any }) => (
        <ProjectSubheader>{children}</ProjectSubheader>
      ),
      normal: ({ children }: { children: any }) => (
        <ProjectPlanetext>{children}</ProjectPlanetext>
      ),
    },
    list: {
      bullet: ({ children }: { children: any }) => (
        <ProjectListitems>{children}</ProjectListitems>
      ),
    },
    types: {
      image: ({ value }: { value: { asset: { _ref: string } } }) => (
        <ProjectImage asset={value.asset} />
      ),
      code: ({ value }: { value: { code: string; language: string } }) => (
        <ProjectCodebox value={value} />
      ),
    },
  }

  if (!project) return <LoadingSpinner />
  return (
    <div className="flex flex-col items-center w-full">
      {/* 분류 */}
      <div className="flex flex-col w-full items-center text-center font-bold text-title-s bg-secondary text-white pt-2 gap-2">
        <ProjectTypeLabel projectTypes={project.projectTypes} />
        <div className="flex h-[1px] w-[40px] bg-white" />
      </div>

      {/* 제목 (상단고정) */}
      <ProjectTitle title={project.title} />

      {/* 요약 */}
      <ProjectSummary
        contribution={project.contribution}
        duration={project.duration}
        releaseDate={project.releaseDate}
        role={project.role}
        skill={project.skill}
        thumbnail={project.thumbnail}
      />

      <div className="flex flex-col px-4 py-12 md:px-[50px] lg:px-[80px] w-full">
        <PortableText value={project.contents} components={components} />
      </div>
    </div>
  )
}
