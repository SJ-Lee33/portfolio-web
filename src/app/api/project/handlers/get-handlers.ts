import 'server-only'
import { client } from '@/lib/sanity'
import { ProjectListDto } from '@/types/project/project-list-dto'

// 프로젝트 리스트 불러오기
export async function getHandler(request: Request) {
  try {
    const url = new URL(request.url)
    const page = url.searchParams.get('page') ?? '1'
    const limit = url.searchParams.get('limit') ?? '10'
    const type = url.searchParams.get('type') ?? undefined
    const artistId = url.searchParams.get('artistId')
    const isTopFixed = url.searchParams.get('isTopFixed')

    // if (artistId) {
    //   const data = await getShowcasesByArtist(
    //     artistId,
    //     page ? parseInt(page) : 1,
    //     limit ? parseInt(limit) : 20,
    //   )
    //   return new Response(JSON.stringify(data), {
    //     status: 200,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    // }
    const data = await getData({
      page: parseInt(page),
      limit: parseInt(limit),
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
    typeFilter = `&& type=='development'`
  } else if (type === 'design') {
    // 디자인 프로젝트
    typeFilter = `&& type=='design'`
  } else if (type === 'marketing') {
    // 마케팅 프로젝트
    typeFilter = `&& type=='marketing'`
  }

  const query = `*[_type == "project" && !(_id in path('drafts.**')) ${typeFilter}] | order(releaseDate desc) [
    ${limit * (page - 1)}...${limit * page}
    ]  {
     'id':_id,
     title,
  type,
  releaseDate,
  skill,
  summary,
  "thumbnail":thumbnail.asset->url
 }`

  const data = await client.fetch(query)
  const projects = data.map((project: any) => {
    return {
      ...project,
      type: project.projectTypes,
    }
  })
  return projects
}
