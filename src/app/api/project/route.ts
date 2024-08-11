import 'server-only'
import { getHandler } from './handlers/get-handlers'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const type = searchParams.get('type') ?? undefined

  return getHandler({
    page: parseInt(page),
    limit: parseInt(limit),
    type: type as string | undefined,
  })
}
