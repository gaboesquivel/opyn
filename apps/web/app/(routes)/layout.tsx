import '@rainbow-me/rainbowkit/styles.css'
import 'overlayscrollbars/overlayscrollbars.css'
import 'katex/dist/katex.min.css'
// last for overwerites
import '@/app/globals.css'

import { GeistSans } from 'geist/font/sans'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Providers } from '@/components/layout/providers'

import { appConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Viewport } from 'next'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import type React from 'react'
import { Toaster } from 'sonner'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn('max-w-full antialiased', GeistSans.className)}
      suppressHydrationWarning
      style={{ WebkitTextSizeAdjust: '100%' }}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, orientation=landscape"
        />
      </head>

      <body
        className={cn(
          'flex flex-col min-h-[100dvh] w-full ',
          'bg-background',
          'text-foreground antialiased p-0 ',
          appConfig.features.ai && 'bg-card',
        )}
      >
        <Providers>
          <div className="flex flex-col min-h-[100dvh] w-full">
            <Header />
            <main
              className={cn(
                'flex w-full overflow-y-auto px-2 sm:px-0 flex flex-col  sm:min-h-[calc(100dvh-100px)] sm:h-auto sm:max-h-none h-[calc(100dvh-140px)] max-h-[calc(100dvh-140px)]',
                {
                  'sm:pb-11': !appConfig.features.ai,
                },
              )}
            >
              {appConfig.features.ai ? <OpynAi /> : children}
            </main>
            {appConfig.features.ai ? null : <Footer />}
          </div>
          <OpynDialog />
        </Providers>
        <Toaster />
        <GoogleAnalytics gaId={appConfig.services.googleAnalyticsId} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

const OpynDialog = dynamic(
  () => import('@/components/dialogs/dialog').then((mod) => mod.OpynDialog),
  {
    ssr: false,
  },
)

const OpynAi = dynamic(
  () => import('@/components/opyn-ai').then((mod) => mod.OpynAi),
  {
    ssr: false,
    loading: () => <div />,
  },
)

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    absolute: 'opyn',
    template: '%s | opyn',
  },
  description: 'opyn!',
  metadataBase: new URL('https://opyn.xyz'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://opyn.xyz',
    title: 'opyn',
    description: 'Opyn Markets',
    images: [
      {
        url: 'https://opyn.xyz/images/og-image.webp',
        alt: 'opyn',
      },
    ],
  },
  twitter: {
    creator: 'opyn',
    site: '@opyn',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://opyn.xyz/images/og-image.webp',
        alt: 'opyn',
      },
    ],
  },
  robots: 'index, search',
  keywords: [],
}
