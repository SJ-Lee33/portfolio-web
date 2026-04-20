import Link from 'next/link'
import ProjectItem from '../../../(home)/components/project-item'

interface Props {
  relatedProjects: any[]
}

export default function ProjectRelated({ relatedProjects }: Props) {
  return (
    <section className="scroll-mt-28">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-title-l font-bold">관련 프로젝트</h2>
      </div>
      <div className="h-[1.5px] bg-neutralLighter mb-6" />

      <div className="space-y-4">
        {relatedProjects.map((reference: any, index: number) => {
          const rel = reference.reference
          return (
            <Link
              href={`/project/${rel.serial}`}
              key={rel.serial}
              target="_blank"
              className="block w-full"
            >
              <ProjectItem
                id={rel.id}
                slug={rel.slug}
                title={rel.title}
                projectTypes={rel.projectTypes}
                summary={rel.summary}
                startDate={rel.startDate}
                releaseDate={rel.releaseDate}
                thumbnail={rel.thumbnail}
                skill={rel?.skill}
                index={index}
              />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
