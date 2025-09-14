import { sanityFetch } from '@/sanity/lib/live'
import { PROJECT_COUNT_QUERY, PROJECT_LIST_QUERY } from '@/sanity/lib/queries'
import { ProjectType } from '@/sanity/schemaTypes/const/projectType'
import type {
  PROJECT_COUNT_QUERYResult,
  PROJECT_LIST_QUERY_TGResult,
  PROJECT_QUERYResult,
} from '@/sanity/types'

import { notFound } from 'next/navigation'

export type ProjectItem = PROJECT_QUERYResult & {
  duration: string
}
export default async function getProjectList({
  projectType,
  page = 1,
  pageSize = 10,
}: {
  projectType: ProjectType | null
  page?: number
  pageSize?: number
}) {
  // 프로젝트 목록
  const { data: projectList } = (await sanityFetch<typeof PROJECT_LIST_QUERY>({
    query: PROJECT_LIST_QUERY,
    params: { projectType }, // ← key는 projectType
  })) as { data: PROJECT_LIST_QUERY_TGResult }
  if (!projectList) notFound()

  // 프로젝트 총 수
  const { data: count } = (await sanityFetch<typeof PROJECT_COUNT_QUERY>({
    query: PROJECT_COUNT_QUERY,
    params: { projectType }, // ← 동일 키
  })) as { data: PROJECT_COUNT_QUERYResult }

  return {
    projectList,
    count,
  }
}
