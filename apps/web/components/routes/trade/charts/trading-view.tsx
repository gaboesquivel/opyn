'use client'

import React, { useEffect, useRef } from 'react'

// Widget placeholder https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/
export function TradingViewChart({
  underlierSymbol,
  numeraireSymbol,
}: {
  underlierSymbol: string
  numeraireSymbol: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${underlierSymbol}${numeraireSymbol}`,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: '#1B1C1D',
      gridColor: '#1B1C1D',
      allow_symbol_change: true,
      hide_side_toolbar: true,
      calendar: false,
      support_host: 'https://opyn-web.vercel.app/',
      hide_top_toolbar: true,
      toolbar_bg: '#1B1C1D',
      hide_symbol_search_bar: true,
    })
    // Remove all existing children
    containerRef.current.replaceChildren()
    // add new script
    containerRef.current.appendChild(script)

    // Function to inject custom styles
    const injectCustomStyles = () => {
      const iframe = containerRef.current?.querySelector('iframe')
      if (iframe?.contentDocument) {
        const style = iframe.contentDocument.createElement('link')
        style.rel = 'stylesheet'
        style.type = 'text/css'
        style.href = '/css/tradingview-custom-styles.css' // Updated path
        iframe.contentDocument.head.appendChild(style)
      }
    }

    injectCustomStyles()

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(script)
      }
    }
  }, [underlierSymbol, numeraireSymbol])

  return (
    <div
      className="tradingview-widget-container flex-grow overflow-hidden"
      ref={containerRef}
    >
      <div className="tradingview-widget-container__widget h-full w-full" />
    </div>
  )
}

// Define the available interval options
const intervalOptions = [
  '1',
  '5',
  '15',
  '30',
  '60',
  '120',
  '240',
  'D',
  'W',
  'M',
] as const

export type IntervalOption = (typeof intervalOptions)[number]

// Helper function to validate interval
export function isValidInterval(interval: string): interval is IntervalOption {
  return intervalOptions.includes(interval as IntervalOption)
}
