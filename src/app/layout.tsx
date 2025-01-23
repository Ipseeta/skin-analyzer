import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skin Analyzer',
  description: 'AI-powered skin analysis and product recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {process.env.NODE_ENV === 'development' ? 
          <div suppressHydrationWarning>{children}</div> : 
          children
        }
      </body>
    </html>
  )
} 