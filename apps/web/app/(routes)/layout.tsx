import '@rainbow-me/rainbowkit/styles.css'
import 'overlayscrollbars/overlayscrollbars.css'
import 'katex/dist/katex.min.css'
// last for overwerites
import '@opyn/ui/opyn.css'
import '@/app/globals.css'

import { GeistSans } from 'geist/font/sans'

import { Footer } from '@/components/layout/footer'
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
          'text-foreground antialiased p-0 text-xxs sm:text-base',
          opynConfig.features.ai && 'bg-card',
        )}
      >
        <OpynNuqsAdapter>
          <Providers>
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
                {opynConfig.features.ai ? <div>AI</div> : children}
              </main>
              {opynConfig.features.ai ? null : <Footer />}
            </div>
          </Providers>
          <Toaster />
          <GoogleAnalytics gaId={opynConfig.services.googleAnalyticsId} />
          <Analytics />
          <SpeedInsights />
        </OpynNuqsAdapter>
      </body>
    </html>
  )
}

// const OpynAi = dynamic(() => import('@opyn/ai').then((mod) => mod.OpynAi), {
//   ssr: false,
//   loading: () => <div />,
// })

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    absolute: 'Opyn Markets',
    template: '%s | Opyn Markets',
  },
  description: 'opyn!',
  metadataBase: new URL('https://opyn-app.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://opyn-app.vercel.app',
    title: 'Opyn Markets',
    description: 'Opyn Markets',
    images: [
      {
        url: 'https://opyn-app.vercel.app/images/og-image.webp',
        alt: 'Opyn Markets',
      },
    ],
  },
  twitter: {
    creator: 'Opyn Markets',
    site: '@opyn',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://opyn-app.vercel.app/images/og-image.webp',
        alt: 'Opyn Markets',
      },
    ],
  },
  robots: 'index, search',
  keywords: [],
}
