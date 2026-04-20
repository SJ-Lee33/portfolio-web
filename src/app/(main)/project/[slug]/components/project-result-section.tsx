'use client'

import { CheckCircle2, TrendingUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ResultMetric } from '@/hooks/get-project'

interface Props {
  outcomes: string[]
  metrics: ResultMetric[]
}

export default function ProjectResultSection({ outcomes, metrics }: Props) {
  return (
    <section id="result" className="scroll-mt-28">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl font-bold text-gray-900">Result</h2>
      </div>
      <div className="h-px bg-gray-100 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Outcomes */}
        {outcomes.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Outcomes
              </p>
            </div>
            <ul className="space-y-3">
              {outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">{o}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Before / After Metrics */}
        {metrics.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-blue-500" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Before / After Metrics
              </p>
            </div>

            <div className="space-y-6">
              {metrics.map((m) => (
                <MetricBar key={m.label} metric={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── 애니메이션 막대그래프 ─────────────────────────────────────────

function MetricBar({ metric: m }: { metric: ResultMetric }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // 막대 너비 계산
  // invert=true(낮을수록 좋음): before가 더 크므로 after/before 비율
  // invert=false(높을수록 좋음): before/after 비율이 "이전" 막대
  const beforePct = m.invert
    ? Math.min(100, Math.round((m.before / Math.max(m.before, m.after)) * 100))
    : Math.min(100, Math.round((m.before / Math.max(m.before, m.after)) * 100))

  const afterPct = m.invert
    ? Math.min(100, Math.round((m.after / m.before) * 100))
    : 100

  const badge = m.invert
    ? `${m.before}${m.unit ?? ''} → ${m.after}${m.unit ?? ''}`
    : `${m.before}${m.unit ?? ''} → ${m.after}${m.unit ?? ''}`

  const afterLabel = m.invert
    ? `${Math.round(((m.before - m.after) / m.before) * 100)}% 감소`
    : `${m.after}${m.unit ?? ''}`

  const barColor = m.color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500'

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-gray-800">{m.label}</p>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
          {badge}
        </span>
      </div>

      <div className="space-y-2">
        {/* Before */}
        <div>
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>Before</span>
            <span>
              {m.before}
              {m.unit ?? ''}
            </span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-300 rounded-full transition-all duration-700 ease-out"
              style={{ width: visible ? `${beforePct}%` : '0%' }}
            />
          </div>
        </div>

        {/* After */}
        <div>
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>After</span>
            <span>{afterLabel}</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out delay-150`}
              style={{ width: visible ? `${afterPct}%` : '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
