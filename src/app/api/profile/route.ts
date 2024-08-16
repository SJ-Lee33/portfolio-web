import 'server-only'
import { getHandler } from './handlers/get-handlers'

export async function GET() {
  return getHandler()
}
