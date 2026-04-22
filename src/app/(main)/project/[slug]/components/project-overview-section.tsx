import {
  Smartphone,
  Brain,
  Paintbrush,
  Music,
  MessageCircle,
  Zap,
  Server,
  Cpu,
  Layers,
  Globe,
  Shield,
  Star,
  Code,
  ShieldAlert,
} from 'lucide-react'
import type { OverviewHighlight } from '@/hooks/get-project'
import ProjectSectionHeader from './project-section-header'

const ICON_MAP: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  brain: Brain,
  brush: Paintbrush,
  music: Music,
  message: MessageCircle,
  zap: Zap,
  server: Server,
  cpu: Cpu,
  layers: Layers,
  globe: Globe,
  shield: Shield,
  star: Star,
  code: Code,
  sheild: ShieldAlert,
}

interface Props {
  desc?: string | null
  highlights: OverviewHighlight[]
}

export default function ProjectOverviewSection({ desc, highlights }: Props) {
  return (
    <section id="overview" className="scroll-mt-28">
      {/* 섹션 헤더 */}
      <ProjectSectionHeader header="overview" />

      {/* 한 줄 설명 */}
      {desc && <p className="text-body-m mb-6 leading-relaxed">{desc}</p>}

      {/* 하이라이트 카드 그리드 */}
      {highlights.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {highlights.map((h) => {
            const IconComp = ICON_MAP[h.icon] ?? Zap
            return (
              <div
                key={h.label}
                className="flex items-start gap-3 bg-white border border-neutralLight/30 rounded-xl p-4 hover:border-primaryLight hover:shadow-md transition-all duration-200"
              >
                <div className="w-9 h-9 bg-primaryLighter/50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconComp size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-body-l font-semibold mb-0.5">{h.label}</p>
                  <p className="text-body-s text-neutral leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
