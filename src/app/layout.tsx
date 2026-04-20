import type { Metadata } from 'next'
import './globals.css'
import { TopButton } from './(main)/(home)/components/top-button'

export const metadata: Metadata = {
  title: '이소진의 포트폴리오',
  description: "Sojin Lee's Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="mb-[100px] text-[#101827]">
        <TopButton />
        {children}
      </body>
    </html>
  )
}
