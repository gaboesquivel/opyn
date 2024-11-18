'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQueryState } from 'nuqs'
import React, { useEffect, useRef } from 'react'

// Widget placeholder https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/
// alternative https://github.com/tradex-app/TradeX-chart
export function TradingViewWidget({ pair = 'ETHUSDC' }: { pair: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [chart, setChart] = useQueryState('chart', {
    defaultValue: 'price',
    clearOnDefault: true,
  })

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement('script')
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${pair}`,
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
  }, [pair])

  return (
    <Card className="flex flex-col h-full max-h-full flex-1 pb-0 m-0">
      <CardHeader className="flex flex-col ">
        <div className="flex flex-row items-center justify-between space-y-0">
          <div className="flex space-x-2 justify-between sm:justify-start w-full sm:w-auto">
            <Tabs value={chart} onValueChange={(value) => setChart(value)}>
              <TabsList className="bg-subtle h-9">
                {['price', 'funding', 'payoff'].map((value) => (
                  <TabsTrigger key={value} value={value} variant={'primary'}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Button variant="subtle" size="sm" className="flex items-center">
              <span className="sm:hidden">Details</span>
              <span className="hidden sm:inline">Market Details</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent
        className="mt-1 sm:mt-0 h-full flex flex-col pb-3 sm:pb-0"
        id="trading-chart"
      >
        <div
          className="tradingview-widget-container flex-grow overflow-hidden "
          ref={containerRef}
        >
          <div className="tradingview-widget-container__widget h-full w-full " />
        </div>
      </CardContent>
    </Card>
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
