import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import config from '@/data/config.json'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(config.site.url || 'https://localhost:3000'),
  title: `${config.site.title} - ${config.site.description}`,
  description: config.hero.fullIntro,
  keywords: ['product designer', 'ux designer', 'creative technologist', 'portfolio'],
  authors: [{ name: config.site.title }],
  openGraph: {
    title: `${config.site.title} - ${config.site.description}`,
    description: config.hero.fullIntro,
    url: config.site.url,
    siteName: config.site.title,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${config.site.title} - ${config.site.description}`,
    description: config.hero.fullIntro,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}