import { client } from '@/lib/sanity'

// 프로필 정보 불러오기
export async function getHandler() {
  try {
    const data = await getData()

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

const getData = async () => {
  const query = `*[_type == "history"  && !(_id in path('drafts.**'))] | order(year desc) [
  ]
    {
      'id':_id,
      year,
      content,
    }
    `

  const data = await client.fetch(query)
  const history = data.map((history: any) => {
    return {
      ...history,
    }
  })
  return history
}
