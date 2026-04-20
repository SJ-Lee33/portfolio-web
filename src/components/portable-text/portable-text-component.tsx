'use client'

import { PortableText } from 'next-sanity'
import PortableMath from './portable-math'
import PortableHeader from '@/components/portable-text/portable-header'
import PortableSubheader from '@/components/portable-text/portable-subheader'
import PortablePlanetext from '@/components/portable-text/portable-plaintext'
import PortableQuote from '@/components/portable-text/portable-quote'
import PortableImage from '@/components/portable-text/portable-image'
import PortableCodebox from '@/components/portable-text/portable-codebox'
import { useMemo, useRef } from 'react'
import PortableTable from './portable-table'
import { urlFor } from '@/sanity/lib/image'
import classNames from 'classnames'
import PortableList from './portable-list'

function slugify(text: string, used: Record<string, number>) {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-가-힣]/g, '')
  const n = (used[base] = (used[base] || 0) + 1)
  return n === 1 ? base : `${base}-${n}`
}

function getPlainText(blk: any) {
  return (blk?.children ?? [])
    .map((c: any) => c?.text ?? '')
    .join('')
    .trim()
}

interface Props {
  value: any[]
  /**
   * true이면 우측 TOC를 렌더링하지 않음.
   * 섹션 구조에서 사이드바가 TOC 역할을 하므로 내부 TOC 불필요.
   */
  hideToc?: boolean
}

export default function Portable({ value, hideToc = false }: Props) {
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

  const seqRef = useRef(0)
  // hideToc 모드에서는 scroll-mt를 28(112px)으로 — NavBar(65px) + 여유
  const SCROLL_MT = hideToc ? 'scroll-mt-28' : 'scroll-mt-[160px]'

  const components: any = {
    block: {
      h1: ({ children, value: blk }: { children: any; value: any }) => {
        const text = getPlainText(blk)
        let id = (blk?._key && idByKey[blk._key]) || headingIds[seqRef.current]
        if (!id) id = slugify(text || 'h1', {})
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
        if (!id) id = slugify(text || 'h2', {})
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
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <div className="bg-white border border-neutralLight/50 rounded-xl p-5 m-5 shadow-sm">
          <ul className="list-disc pl-5 space-y-1.5 text-body-m">{children}</ul>
        </div>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <div className="bg-white border border-neutralLight/50 rounded-xl p-5 m-5 shadow-sm">
          <ol className="list-decimal pl-5 space-y-1.5 text-body-m">
            {children}
          </ol>
        </div>
      ),
    },
    types: {
      image: ({ value }: { value: any }) => {
        // GROQ에서 url 직접 주입된 경우와 asset 참조 방식 모두 지원
        const url = value?.url ?? urlFor(value).url()
        return <PortableImage url={url} />
      },
      code: ({ value }: { value: { code: string; language?: string } }) => (
        <div
          className="pl-5 text-body-m mt-2 mb-[20px] overflow-auto"
          suppressHydrationWarning
        >
          <PortableCodebox code={value.code} language={value.language} />
        </div>
      ),
      math: ({ value }: any) => <PortableMath value={value} />,
      featureTable: ({ value }: { value: any }) => (
        <div className="my-6 ml-4 overflow-x-auto">
          <PortableTable value={value} />
        </div>
      ),
    },
  }

  // hideToc=false(레거시 모드)일 때만 우측 TOC 표시
  const Toc = () =>
    !hideToc && headings.length ? (
      <nav className="-z-10 hidden md:block sticky top-[140px] h-fit max-w-60 mt-[80px] ml-6 pl-4 pt-4 border-l border-neutral">
        <div className="text-body-s font-semibold mb-3 text-neutralLight">
          목차
        </div>
        <ul className="space-y-1 text-body-s">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 2 ? 'pl-4' : ''}>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(h.id)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className={classNames(
                  'block w-full text-left truncate leading-5 cursor-pointer hover:text-primary',
                  h.level === 1
                    ? 'font-semibold text-neutral mt-3'
                    : 'font-light text-neutralLight',
                )}
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
