import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Olimpiade Matematika MathVibe Indonesia',
  description: 'Kompetisi matematika nasional untuk SMP dan SMA dengan sistem CBT modern',
  keywords: 'olimpiade matematika, mathvibe, kompetisi matematika, CBT, SMP, SMA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  )
}