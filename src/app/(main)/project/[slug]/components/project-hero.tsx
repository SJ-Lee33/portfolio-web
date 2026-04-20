import { Globe, FileText, Play, ExternalLink, Layers } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'
import type { ProjectItem } from '@/hooks/get-project'

const ICON_MAP: Record<string, React.ReactNode> = {
  github: <FaGithub size={15} />,
  globe: <Globe size={15} />,
  file: <FileText size={15} />,
  play: <Play size={15} />,
  external: <ExternalLink size={15} />,
}

interface Props {
  project: ProjectItem
  year: string
}

export default function ProjectHero({ project, year }: Props) {
  const techTags = project.skill ?? []
  const kpis = project.kpis ?? []
  const links = project.links ?? []
  const roles = project.role
    ? project.role
        .split(',')
        .map((r) => r.trim())
        .filter(Boolean)
    : []

  // 분류 뱃지 텍스트
  const t = project.projectTypes ?? {}
  const parts = [
    t.engineering && '개발',
    t.planning && '기획',
    t.design && '디자인',
  ].filter(Boolean)
  const typeLabel = parts.length ? parts.join(' · ') : 'Project'

  return (
    <section className="bg-white border-b border-gray-100 px-5 lg:px-20 py-10 lg:py-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* 썸네일 */}
          <div className="w-full lg:w-[260px] flex-shrink-0">
            {project.thumbnail ? (
              <div className="w-full lg:w-[260px] aspect-[3/4] rounded-2xl overflow-hidden relative border border-gray-100 shadow-sm">
                <Image
                  src={project.thumbnail}
                  alt={project.title ?? ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 260px"
                  priority
                />
              </div>
            ) : (
              <div className="w-full lg:w-[260px] aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-900/20" />
                <div className="relative z-10 text-center px-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Layers size={36} className="text-white" />
                  </div>
                  <p className="text-blue-700 font-semibold text-sm tracking-wide uppercase">
                    Project
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>
            )}
          </div>

          {/* 메타 정보 */}
          <div className="flex-1 min-w-0">
            {/* 분류 + 연도 */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full">
                {typeLabel}
              </span>
              {year && <span className="text-xs text-gray-400">{year}</span>}
            </div>

            {/* 제목 */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
              {project.title}
            </h1>

            {/* 요약 */}
            {project.summary && (
              <p className="text-base lg:text-lg text-gray-500 mb-8 font-medium leading-relaxed">
                {project.summary}
              </p>
            )}

            {/* KPI 카드 */}
            {kpis.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200"
                  >
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                      {kpi.label}
                    </p>
                    <p className="text-2xl lg:text-3xl font-black text-blue-600 leading-none mb-1">
                      {kpi.value}
                    </p>
                    {kpi.sub && (
                      <p className="text-xs text-gray-500">{kpi.sub}</p>
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
                    className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:border-blue-300 hover:text-blue-700 transition-colors duration-150"
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
                    className="text-xs text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md font-medium"
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
                    className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-200 hover:shadow-lg text-white hover:bg-neutral bg-neutral/80`}
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
