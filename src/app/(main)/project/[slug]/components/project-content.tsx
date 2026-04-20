'use client'

import { useState, useRef } from 'react'
import { PortableText } from 'next-sanity'
import classNames from 'classnames'
import PortableHeader from '../../../../../components/portable-text/portable-header'
import PortableSubheader from '../../../../../components/portable-text/portable-subheader'
import PortablePlanetext from '../../../../../components/portable-text/portable-plaintext'
import PortableListBullet from '../../../../../components/portable-text/portable-listbullet'
import PortableImage from '../../../../../components/portable-text/portable-image'
// import PortableListNumber from '../../../../../components/portable-text/portable-listnumber'
import PortableQuote from '../../../../../components/portable-text/portable-quote'
import dynamic from 'next/dynamic'
import Portable from '@/components/portable-text/portable-text-component'
const ProjectCodebox = dynamic(
  () => import('../../../../../components/portable-text/portable-codebox'),
  {
    ssr: false,
  },
)
export default function ProjectContent({
  overview,
  contribution,
  skill,
  reflection,
}: {
  overview: any
  contribution: any
  skill: any
  reflection: any
}) {
  const [activeTab, setActiveTab] = useState('contentOverview')
  const contentSectionRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { id: 'contentOverview', label: '개요', value: overview },
    { id: 'contentContribution', label: '기여도', value: contribution },
    { id: 'contentSkill', label: '사용 기술', value: skill },
    { id: 'contentReflection', label: '회고', value: reflection },
  ]

  return (
    <div
      className="relative mt-10 border-t border-neutralLight"
      ref={contentSectionRef}
    >
      <div className="flex w-full gap-4">
        {/* 좌측 고정 탭 메뉴 */}
        <div className="sticky top-[200px] self-start h-fit mt-[50px]">
          <ul className="flex flex-col gap-1 text-sm font-light">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={classNames(
                  'cursor-pointer transition-colors px-2 py-1 rounded-md text-body-m',
                  activeTab === tab.id
                    ? 'font-semibold bg-primary text-white'
                    : 'text-neutral hover:text-primary hover:font-semibold',
                )}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        {/* 우측 내용 */}
        <div className="flex-1">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <Portable key={tab.id} value={tab.value} />
              ),
          )}
        </div>
      </div>
    </div>
  )
}
