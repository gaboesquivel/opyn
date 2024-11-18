'use client'

import { useTradeRoute } from '@/components/routes/trade/hooks/use-trade-route'
import { getMarkets } from '@opyn/api'
import { useEffect, useRef } from 'react'

export function FooterTradingView() {
  const { trade } = useTradeRoute()
  const markets = getMarkets({ trade })
  const footerRef = useRef<HTMLElement>(null)

  const symbols = markets.map(({ value, label }) => ({
    proName: `BINANCE:${value}`,
    title: label,
  }))
  console.log(markets, symbols)

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
