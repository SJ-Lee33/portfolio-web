'use client'

import { PortableText } from 'next-sanity'
import PortableMath from './portable-math'
import PortableHeader from '@/components/portable-text/portable-header'
import PortableSubheader from '@/components/portable-text/portable-subheader'
import PortablePlanetext from '@/components/portable-text/portable-plaintext'
import PortableQuote from '@/components/portable-text/portable-quote'
import PortableListBullet from '@/components/portable-text/portable-listbullet'
import PortableListNumber from '@/components/portable-text/portable-listnumber'
import PortableImage from '@/components/portable-text/portable-image'
import PortableCodebox from '@/components/portable-text/portable-codebox'
import { useEffect, useMemo, useRef, useState } from 'react'

// 한글 포함 슬러그화 (중복 방지를 위해 used 카운터 사용)
function slugify(text: string, used: Record<string, number>) {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-가-힣]/g, '')
  const n = (used[base] = (used[base] || 0) + 1)
  return n === 1 ? base : `${base}-${n}`
}

// 블록 내 텍스트만 뽑기
function getPlainText(blk: any) {
  return (blk?.children ?? [])
    .map((c: any) => c?.text ?? '')
    .join('')
    .trim()
}

export default function Portable({ value }: { value: any[] }) {
  // 1) h1/h2 수집 + 고유 id 생성
  const { headings, idByKey, headingIds } = useMemo(() => {
    const used: Record<string, number> = {}
    const hs: { id: string; text: string; level: 1 | 2; _key?: string }[] = []

    ;(value ?? []).forEach((b: any) => {
      if (b?._type !== 'block') return
      if (b.style !== 'h1' && b.style !== 'h2') return
      const text = getPlainText(b)
      if (!text) return
      const id = slugify(text, used)
      hs.push({ id, text, level: b.style === 'h1' ? 1 : 2, _key: b._key })
    })

    const map: Record<string, string> = {}
    hs.forEach((h) => {
      if (h._key) map[h._key] = h.id
    })
    return { headings: hs, idByKey: map, headingIds: hs.map((h) => h.id) }
  }, [value])

  // 2) 현재 활성 heading 추적
  const [activeId, setActiveId] = useState<string | null>(null)
  useEffect(() => {
    if (!headings.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]?.target?.id) setActiveId(vis[0].target.id)
      },
      {
        rootMargin: '-120px 0px -70% 0px', // 고정 헤더 높이에 맞게 조정
        threshold: [0, 1],
      },
    )
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [headings])

  // 3) 렌더 시에도 h1/h2에 정확히 같은 id 부여
  // _key로 매칭이 안 되는 경우(없을 때)는 headingIds 순서를 따라 부여
  const seqRef = useRef(0)
  const SCROLL_MT = 'scroll-mt-[120px]'
  const components: any = {
    block: {
      h1: ({ children, value: blk }: { children: any; value: any }) => {
        const text = getPlainText(blk)
        let id = (blk?._key && idByKey[blk._key]) || headingIds[seqRef.current]
        if (!id) {
          // 혹시라도 동기화가 어긋나면 슬러그로 안전 fallback
          id = slugify(text || 'h1', {})
        }
        seqRef.current += 1
        return (
          <div id={id} className={SCROLL_MT}>
            <PortableHeader>{children}</PortableHeader>
          </div>
        )
      },
      h2: ({ children, value: blk }: { children: any; value: any }) => {
        const text = getPlainText(blk)
        let id = (blk?._key && idByKey[blk._key]) || headingIds[seqRef.current]
        if (!id) {
          id = slugify(text || 'h2', {})
        }
        seqRef.current += 1
        return (
          <div id={id} className={SCROLL_MT}>
            <PortableSubheader>{children}</PortableSubheader>
          </div>
        )
      },
      normal: ({ children }: { children: any }) => (
        <PortablePlanetext>{children}</PortablePlanetext>
      ),
      quote: ({ children }: { children: any }) => (
        <PortableQuote>{children}</PortableQuote>
      ),
    },
    listItem: {
      bullet: ({ children }: { children: any }) => (
        <PortableListBullet>{children}</PortableListBullet>
      ),
      number: ({ children }: { children: any }) => (
        <PortableListNumber>{children}</PortableListNumber>
      ),
    },
    types: {
      image: ({ value }: { value: { url: string } }) => (
        <PortableImage url={value.url} />
      ),
      code: ({ value }: { value: { code: string; language?: string } }) => (
        <div
          className="px-4 md:px-10 text-body-m mt-2 mb-[30px] overflow-auto"
          suppressHydrationWarning
        >
          <PortableCodebox code={value.code} language={value.language} />
        </div>
      ),
      math: ({ value }: any) => <PortableMath value={value} />,
    },
  }

  // 4) 우측 TOC: URL 변경 없이 스크롤만
  const Toc = () =>
    headings.length ? (
      <nav className="hidden md:block sticky top-[140px] h-fit max-w-60 mt-[80px] ml-6 pl-4 border-l border-neutral ">
        <div className="text-body-s font-semibold mb-3 text-neutralLight">
          목차
        </div>
        <ul className="space-y-1 text-body-s">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 2 ? 'ml-2' : ''}>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(h.id)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className={[
                  'block w-full text-left truncate leading-5 cursor-pointer',
                  activeId === h.id
                    ? 'text-primary font-medium'
                    : 'text-neutralLight font-light hover:text-primary',
                ].join(' ')}
                aria-current={activeId === h.id ? 'true' : 'false'}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    ) : null

  return (
    <div className="w-full flex">
      <div className="min-w-0 flex-1">
        <PortableText value={value} components={components} />
      </div>
      <Toc />
    </div>
  )
}
