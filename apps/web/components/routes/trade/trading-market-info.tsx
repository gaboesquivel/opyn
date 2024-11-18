'use client'

import {
  OnePerpIcon,
  TwoPerpIcon,
  ZeroDotFivePerpIcon,
} from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useQueryState } from 'nuqs'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useTradeData } from './hooks/use-trade-data'
import { useTradeRoute } from './hooks/use-trade-route'
import type { TradeRouteParams } from './routing'

export function TradingMarketInfo({ pair, trade }: TradeRouteParams) {
  const { data } = useTradeData({ pair, trade })
  const [perp, setPerp] = useQueryState('perp', { defaultValue: '1' })

  if (!data) return null

  const { indexPrice, markPrice, change24h, volume24h, openInterest } =
    data.market

  const isPositiveChange = change24h.value > 0
  const changeColorClass = isPositiveChange ? 'text-positive' : 'text-negative'

  const marketInfoItems = [
    { label: 'Index Price', value: `$${indexPrice.toFixed(2)}` },
    { label: 'Mark Price', value: `$${markPrice.toFixed(2)}` },
    {
      label: '24h Change',
      value: `$${Math.abs(change24h.value).toFixed(2)} (${change24h.percentage.toFixed(2)}%)`,
      className: changeColorClass,
    },
    { label: '24h volume', value: `$${volume24h.toLocaleString()}` },
    { label: 'Open interest', value: `$${openInterest.toLocaleString()}` },
  ]

  return (
    <Card variant="padded" className="sm:py-0">
      <div className="flex items-center text-sm gap-3 sm:gap-8">
        {/* Fixed width prevents layout shift / flickeringx */}
        <div className="flex items-center gap-2">
          {perp === '0.5' && (
            <Button
              variant="outline"
              className="flex items-center gap-2 w-[110px]"
              onClick={() => setPerp('1')}
            >
              <div className="text-primary">
                <ZeroDotFivePerpIcon />
              </div>
              <span>0.5 Perp</span>
            </Button>
          )}
          {perp === '1' && (
            <Button
              variant="outline"
              className="flex items-center gap-2 w-[110px]"
              onClick={() => setPerp('2')}
            >
              <div className="text-primary">
                <OnePerpIcon />
              </div>
              <span>1 Perp</span>
            </Button>
          )}
          {perp === '2' && (
            <Button
              variant="outline"
              className="flex items-center gap-2 w-[110px]"
              onClick={() => setPerp('0.5')}
            >
              <div className="text-primary">
                <TwoPerpIcon />
              </div>
              <span>2 Perp</span>
            </Button>
          )}
        </div>

        <div className="flex w-full sm:hidden justify-around self-end">
          {marketInfoItems.slice(0, 3).map((item) => (
            <div key={item.label} className="flex flex-col mr-2">
              <p className="text-neutral-light">{item.label}</p>
              <p className={item.className}>{item.value}</p>
            </div>
          ))}
        </div>

        <div className="w-full hidden sm:block">
          <OverlayScrollbarsComponent defer className="w-full">
            <div className="flex pb-3 sm:py-4">
              {marketInfoItems.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col min-w-[110px] mr-2"
                >
                  <p className="text-neutral-light">{item.label}</p>
                  <p className={item.className}>{item.value}</p>
                </div>
              ))}
            </div>
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </Card>
  )
}

export function TradingMarketInfoMobile({ pair, trade }: TradeRouteParams) {
  const { data } = useTradeData({ pair, trade })

  if (!data) return null

  const { indexPrice, markPrice, change24h, volume24h, openInterest } =
    data.market

  const isPositiveChange = change24h.value > 0
  const changeColorClass = isPositiveChange ? 'text-positive' : 'text-negative'

  const marketInfoItems = [
    { label: 'Index Price', value: `$${indexPrice.toFixed(2)}` },
    { label: 'Mark Price', value: `$${markPrice.toFixed(2)}` },
    {
      label: '24h Change',
      value: `$${Math.abs(change24h.value).toFixed(2)} (${change24h.percentage.toFixed(2)}%)`,
      className: changeColorClass,
    },
    { label: '24h volume', value: `$${volume24h.toLocaleString()}` },
    { label: 'Open interest', value: `$${openInterest.toLocaleString()}` },
  ]

  return (
    <Card variant="padded" className="p-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        {marketInfoItems.map((item) => (
          <div key={item.label} className="flex flex-col">
            <p className="text-neutral-light">{item.label}</p>
            <p className={item.className || ''}>{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
