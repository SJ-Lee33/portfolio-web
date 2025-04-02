import 'server-only'
export const dynamic = 'force-dynamic'
import { getHandler } from './handlers/get-handlers'

export async function GET(request: Request) {
  return getHandler(request)
}
