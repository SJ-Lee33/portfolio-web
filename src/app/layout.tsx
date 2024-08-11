import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
