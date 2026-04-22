import { NextResponse } from 'next/server'
import getResume from '@/hooks/get-resume'

export async function GET() {
  const data = await getResume()

  const fileRes = await fetch(data.resumeUrl)
  const buffer = await fileRes.arrayBuffer()

  const filename = '경력기술서_이소진.pdf'

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="Resume_sojin_lee.pdf"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      'Cache-Control': 'no-store',
    },
  })
}
