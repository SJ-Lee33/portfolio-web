import { client } from '@/lib/sanity'

export async function getHandler(request: Request) {
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
  const query = `*[_type == "history"  && !(_id in path('drafts.**'))] | order(year desc)
    {
      year
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
