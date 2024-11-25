import '@rainbow-me/rainbowkit/styles.css'
import 'overlayscrollbars/overlayscrollbars.css'
import 'katex/dist/katex.min.css'
// last for overwerites
// import '@opyn/ui/opyn.css'
import '@/app/globals.css'

import { GeistSans } from 'geist/font/sans'

import { Header } from '@/components/layout/header'
import { Providers } from '@/components/layout/providers'

import { GoogleAnalytics } from '@next/third-parties/google'
import { OpynNuqsAdapter } from '@opyn/hooks'
import { opynConfig } from '@opyn/lib'
import { cn } from '@opyn/ui'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Viewport } from 'next'
import type { Metadata } from 'next'
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
          'text-foreground antialiased p-0 text-xxs sm:text-base',
          opynConfig.features.ai && 'bg-card',
        )}
      >
        <Providers>
          <OpynNuqsAdapter>
            <div className="flex flex-col min-h-[100dvh] w-full">
              <Header />
              <main
                className={cn(
                  'flex w-full overflow-y-auto px-2 sm:px-0 flex flex-col  sm:min-h-[calc(100dvh-100px)] sm:h-auto sm:max-h-none h-[calc(100dvh-140px)] max-h-[calc(100dvh-140px)]',
                  {
                    'sm:pb-11': !opynConfig.features.ai,
                  },
                )}
              >
                {children}
              </main>
            </div>
          </OpynNuqsAdapter>
        </Providers>
        <Toaster />
        <GoogleAnalytics gaId={opynConfig.services.googleAnalyticsId} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    absolute: 'Opyn Glass',
    template: '%s | Opyn Glass',
  },
  description: 'opyn!',
  metadataBase: new URL('https://opyn-glass.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://opyn-glass.vercel.app',
    title: 'Opyn Glass',
    description: 'Opyn Markets Monitor',
    images: [
      {
        url: 'https://opyn-glass.vercel.app/images/og-image.webp',
        alt: 'Opyn Glass',
      },
    ],
  },
  twitter: {
    creator: 'opyn',
    site: '@opyn-glass',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://opyn-glass.vercel.app/images/og-image.webp',
        alt: 'Opyn Glass',
      },
    ],
  },
  robots: 'index, search',
  keywords: [],
}
