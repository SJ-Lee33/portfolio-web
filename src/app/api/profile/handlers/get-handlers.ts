import { client } from '@/lib/sanity'

// 프로필 정보 불러오기
export async function getHandler(request: Request) {
  try {
    const url = new URL(request.url)

    const page = url.searchParams.get('page') ?? '1'
    const limit = url.searchParams.get('limit') ?? '50'

    const data = await getData({ page: parseInt(page), limit: parseInt(limit) })
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

const getData = async ({ page, limit }: { page: number; limit: number }) => {
  const query = `*[_type == "history" && !(_id in path('drafts.**')) ] | order(year desc) [
    ${limit * (page - 1)}...${limit * page}
    ]  {
    'id': _id,
    year,
      content,
 }`

  const data = await client.fetch(query)
  const history = data.map((history: any) => {
    return {
      ...history,
    }
  })
  return history
}
