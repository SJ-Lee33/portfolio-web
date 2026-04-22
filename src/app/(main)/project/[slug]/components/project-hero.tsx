import { Globe, FileText, Play, ExternalLink, Layers } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import type { ProjectItem } from '@/hooks/get-project'
import ProjectTypeLabel from '@/app/(main)/(home)/components/project-type-label'
import { formatDate } from '@/utils/formatDate'

const ICON_MAP: Record<string, React.ReactNode> = {
  github: <FaGithub size={15} />,
  globe: <Globe size={15} />,
  file: <FileText size={15} />,
  play: <Play size={15} />,
  external: <ExternalLink size={15} />,
}

interface Props {
  project: ProjectItem
}

export default function ProjectHero({ project }: Props) {
  const techTags = project.skill ?? []
  const kpis = project.kpis ?? []
  const links = project.links ?? []
  const roles = project.role
    ? project.role
        .split(',')
        .map((r) => r.trim())
        .filter(Boolean)
    : []

  return (
    <section className="px-5 md:px-20 py-10 md:py-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* 썸네일 */}
          <div className="w-full md:w-[260px] flex-shrink-0">
            {project.thumbnail ? (
              <div className="w-full md:w-[260px] max-h-[520px] md:max-h-max aspect-[3/4] rounded-2xl overflow-hidden relative shadow-xl">
                <Image
                  src={project.thumbnail}
                  alt={project.title ?? 'thumbnail image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 260px"
                  priority
                />
              </div>
            ) : (
              <div className="w-full md:w-[260px] aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br border border-neutral flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20" />
                <div className="relative z-10 text-center px-6">
                  <div className="w-20 h-20 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Layers size={36} className="text-white" />
                  </div>
                  <p className="font-semibold text-body-s tracking-wide uppercase">
                    Project Thumbnail Image
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32" />
              </div>
            )}
          </div>

          {/* 메타 정보 */}
          <div className="flex-1 min-w-0">
            {/* 분류 + 연도 */}
            <div className="flex items-center gap-4 mb-3 text-body-s">
              <ProjectTypeLabel projectTypes={project.projectTypes} badge />
              <div>
                {formatDate(project.startDate!)} -{' '}
                {formatDate(project.releaseDate!)}
              </div>
            </div>

            {/* 제목 */}
            <h1 className="text-headline-l md:text-headline-m font-bold text-neutral leading-tight mb-3">
              {project.title}
            </h1>

            {/* 요약 */}
            {project.summary && (
              <div className="text-base text-neutral mb-8 leading-relaxed">
                {project.summary}
              </div>
            )}

            {/* KPI 카드 */}
            {kpis.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="bg-neutralLight/10 border border-neutralLight/30 rounded-xl p-4 hover:border-primaryLighter/70 hover:bg-primaryLighter/50 transition-all duration-200"
                  >
                    <p className="text-body-m font-semibold text-neutral uppercase tracking-wide mb-1">
                      {kpi.label}
                    </p>
                    <p className="text-title-m font-extrabold text-primary leading-none mb-1">
                      {kpi.value}
                    </p>
                    {kpi.sub && (
                      <p className="text-body-s text-neutral">{kpi.sub}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 기술 스택 */}
            {techTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {techTags.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1.5 text-caption font-semibold bg-white border border-neutralLight text-neutral px-3 py-1.5 rounded-md
                     hover:border-primary hover:text-primary transition-colors duration-150"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* 역할 뱃지 */}
            {roles.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {roles.map((r) => (
                  <span
                    key={r}
                    className="text-body-s text-primary bg-primaryLighter/30 border border-primary px-3 py-0.5 rounded-md font-medium"
                  >
                    {r}
                  </span>
                ))}
              </div>
            )}

            {/* 외부 링크 버튼 */}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-body-s font-semibold px-5 py-2 rounded-xl transition-all duration-200 hover:shadow-md text-white hover:bg-neutral bg-neutral/80`}
                  >
                    {ICON_MAP[link.icon!] ?? <ExternalLink size={15} />}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
