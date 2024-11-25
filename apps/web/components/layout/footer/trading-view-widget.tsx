'use client'

import { useMarket } from '@opyn/hooks'
import { createSupabaseNextClient } from '@opyn/supabase'
import { getMarkets } from '@opyn/supabase'
import { useEffect, useRef } from 'react'

export async function FooterTradingView() {
  const { marketType } = useMarket()
  const supabase = await createSupabaseNextClient()
  const markets = getMarkets({ marketType, supabase })
  const footerRef = useRef<HTMLElement>(null)

  const symbols = await markets.then((markets) =>
    markets.map((market) => ({
      proName: `BINANCE:${market.underlier?.symbol}${market.numeraire?.symbol}`,
      title: `${market.underlier?.symbol}/${market.numeraire?.symbol}`,
    })),
  )

  useEffect(() => {
    if (!footerRef.current) return

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols,
      showSymbolLogo: false,
      isTransparent: true,
      displayMode: 'regular',
      colorTheme: 'dark',
      locale: 'en',
    })

    const widgetContainer = document.createElement('div')
    widgetContainer.className = 'tradingview-widget-container'

    const widget = document.createElement('div')
    widget.className = 'tradingview-widget-container__widget'

    widgetContainer.appendChild(widget)
    widgetContainer.appendChild(script)

    footerRef.current.appendChild(widgetContainer)

    return () => {
      if (footerRef.current) {
        footerRef.current.removeChild(widgetContainer)
      }
    }
  }, [symbols])

  return (
    <footer
      className="overflow-hidden whitespace-nowrap sticky bottom-0 bg-background"
      ref={footerRef}
    />
  )
}
