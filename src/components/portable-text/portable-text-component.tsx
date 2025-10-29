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
import { useMemo, useRef } from 'react'
import PortableTable from './portable-table'

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

  // 2) 렌더 시에도 h1/h2에 정확히 같은 id 부여
  // _key로 매칭이 안 되는 경우(없을 때)는 headingIds 순서를 따라 부여
  const seqRef = useRef(0)
  const SCROLL_MT = 'scroll-mt-[160px]'

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
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <ul
          className="
          list-disc
          [&_ul]:-ml-2 [&_ul]:list-[circle]  
          [&_ul_ul]:-ml-2 [&_ul_ul]:list-[square]
        "
        >
          {children}
        </ul>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal">{children}</ol>
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

      featureTable: ({ value }: { value: any }) => (
        <div className="my-6 overflow-x-auto">
          <PortableTable value={value} />
        </div>
      ),
    },
  }

  // 3) 우측 TOC: URL 변경 없이 스크롤만
  const Toc = () =>
    headings.length ? (
      <nav className="hidden md:block sticky top-[140px] h-fit max-w-60 mt-[80px] ml-6 pl-4 border-l border-neutral ">
        <div className="text-body-s font-semibold mb-3 text-neutralLight">
          목차
        </div>
        <ul className="space-y-1 text-body-s">
          {headings.map((h) => (
            <li key={h.id}>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById(h.id)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className={[
                  'block w-full text-left truncate leading-5 cursor-pointer',
                  'text-neutralLight font-light hover:text-primary hover:font-bold',
                ].join(' ')}
              >
                {h.level == 2 && '┗ '}
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
