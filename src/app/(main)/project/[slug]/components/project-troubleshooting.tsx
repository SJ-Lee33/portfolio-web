'use client'

import { PortableText } from 'next-sanity'
import ProjectImage from './project-image'
import ProjectListBullet from './project-listbullet'
import ProjectPlanetext from './project-plaintext'
import ProjectQuote from './project-quote'
import Troubleshootingheader from './project-troubleshooting-header'
import ProjectListNumber from './project-listnumber'
import dynamic from 'next/dynamic'
const ProjectCodebox = dynamic(() => import('./project-codebox'), {
  ssr: false,
})

export default function ProjectTroubleShooting({
  index,
  title,
  content,
}: {
  index: number
  title: string
  content: []
}) {
  const troubleShootingComponents: any = {
    block: {
      h3: ({ children }: { children: any }) => (
        <Troubleshootingheader>{children}</Troubleshootingheader>
      ),
      h4: ({ children }: { children: any }) => (
        <ProjectQuote>{children}</ProjectQuote>
      ),
      normal: ({ children }: { children: any }) => (
        <ProjectPlanetext>{children}</ProjectPlanetext>
      ),
    },
    listItem: {
      bullet: ({ children }: { children: any }) => (
        <ProjectListBullet>{children}</ProjectListBullet>
      ),
      number: ({ children }: { children: any }) => (
        <ProjectListNumber>{children}</ProjectListNumber>
      ),
    },
    types: {
      image: ({ value }: { value: { url: string } }) => (
        <ProjectImage url={value.url} />
      ),
      code: ({ value }: { value: { code: string; language: string } }) => (
        <div
          className="px-4 md:px-10 text-body-m mt-2 mb-[30px] overflow-auto"
          suppressHydrationWarning
        >
          <ProjectCodebox code={value.code} language={value.language} />
        </div>
      ),
    },
  }
  return (
    <div key={index} className="bg-neutralLighter mt-[60px] px-5 py-8">
      {/* 타이틀 */}
      <div className="text-title-l font-bold text-start text-red md:px-5 -mb-5">
        {'[ 문제 ' + index + ' ] ' + title}
      </div>

      {/* 내용 */}
      <PortableText value={content} components={troubleShootingComponents} />
    </div>
  )
}
