import 'server-only'
import { client } from '@/lib/sanity'
import { ProjectListDto } from '@/types/project/project-list-dto'

// 프로젝트 리스트 불러오기
export async function getHandler({
  page,
  limit,
  type,
}: {
  page: number
  limit: number
  type?: string
}) {
  try {
    const data = await getData({
      page,
      limit,
      type: type as ProjectListDto['type'] | undefined,
    })

    return new Response(
      JSON.stringify({
        data,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error(error)
    return new Response('Bad Request', { status: 400 })
  }
}

const getData = async ({
  page,
  limit,
  type,
}: {
  page: number
  limit: number
  type?: ProjectListDto['type']
}) => {
  let typeFilter = ''

  if (type === 'development') {
    // 개발 프로젝트
    typeFilter = `&& projectTypes.development == true`
  } else if (type === 'design') {
    // 디자인 프로젝트
    typeFilter = `&& projectTypes.design == true`
  } else if (type === 'marketing') {
    // 마케팅 프로젝트
    typeFilter = `&& projectTypes.marketing == true`
  }

  const query = `*[_type == "project" && !(_id in path('drafts.**')) ${typeFilter}] | order(releaseDate desc) [
    ${limit * (page - 1)}...${limit * page}
    ]  {
     'id':_id,
     title,
        projectTypes,
        releaseDate,
        skill,
        summary,
        "thumbnail":thumbnail.asset->url
 }`

  const data = await client.fetch(query)

  const projects = data.map((project: any) => {
    let current = ''

    if (project.projectTypes.development) {
      current = 'development'
    } else if (project.projectTypes.design) {
      current = 'design'
    } else if (project.projectTypes.marketing) {
      current = 'marketing'
    }
    return {
      ...project,
      type: current,
    }
  })

  return projects
}
