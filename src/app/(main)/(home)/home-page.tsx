import React from 'react'
import FirstScreen from './components/first-screen'
import HistoryScreen from './components/history-screen'
import SkillsScreen from './components/skills-screen'
import WorkScreen from './components/work-screen'
import HeaderClient from './components/header-client'
import ProjectsScreen from './components/projects-screen'
import ScrollToProjectsOnRoute from './hook/scroll-to-project'
import ScrollToProfileOnRoute from './hook/scroll-to-profile'

export default async function HomePage({
  projectType,
  autoScrollTo,
}: {
  projectType: 'development' | 'design' | 'marketing' | null
  autoScrollTo?: 'projects' | 'profile' | undefined
}) {
  return (
    <div>
      <ScrollToProfileOnRoute targetId="profile" offset={20} />
      <ScrollToProjectsOnRoute targetId="projects" offset={50} />

      {/* 최상단 헤더 */}
      <header className="w-full fixed top-0 z-50">
        <HeaderClient />
      </header>

      {/* 첫화면 */}
      <FirstScreen />

      {/* 이력 */}
      <section id="profile">
        <HistoryScreen />
      </section>
      <WorkScreen />

      {/* 스킬 */}
      <SkillsScreen />

      {/* 프로젝트 */}
      <section id="projects">
        <ProjectsScreen projectType={projectType} />
      </section>
    </div>
  )
}
