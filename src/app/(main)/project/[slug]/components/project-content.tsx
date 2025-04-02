'use client'

import { useState, useRef } from 'react'
import { PortableText } from 'next-sanity'
import classNames from 'classnames'
import ProjectHeader from './project-header'
import ProjectSubheader from './project-subheader'
import ProjectPlanetext from './project-plaintext'
import ProjectListitems from './project-listitems'
import ProjectImage from './project-image'
import ProjectCodebox from './project-codebox'

export default function ProjectContent({
  overview,
  contribution,
  skill,
  reflection,
}: {
  overview: []
  contribution: []
  skill: []
  reflection: []
}) {
  const [activeTab, setActiveTab] = useState('contentOverview')
  const contentSectionRef = useRef<HTMLDivElement>(null)
  const portableComponents: any = {
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
    listItem: {
      bullet: ({ children }: { children: any }) => (
        <ProjectListitems>{children}</ProjectListitems>
      ),
    },
    types: {
      image: ({ value }: { value: { url: string } }) => (
        <ProjectImage url={value.url} />
      ),
      code: ({ value }: { value: { code: string; language: string } }) => (
        <ProjectCodebox value={value} />
      ),
    },
  }
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
                <PortableText
                  key={tab.id}
                  value={tab.value}
                  components={portableComponents}
                />
              ),
          )}
        </div>
      </div>
    </div>
  )
}
