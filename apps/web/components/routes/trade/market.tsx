'use client'

import {
  OnePerpIcon,
  TwoPerpIcon,
  ZeroDotFivePerpIcon,
} from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { parseMarketSlug } from '@/lib/opyn'
import type { Tables } from '@opyn/supabase'
import { useQueryState } from 'nuqs'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import type { TradeRouteParams } from './routing'

export function TradeMarketData({
  marketSlug,
  marketType,
  marketMetric,
}: TradeRouteParams & { marketMetric: Tables<'market_metric'> }) {
  const [perp, setPerp] = useQueryState('perp', { defaultValue: '1' })

  if (!marketMetric) return null

  const marketInfoItems = [
    {
      label: 'Index Price',
      value: `$${(1950 + Math.random() * 100).toFixed(2)}`,
    },
    {
      label: 'Mark Price',
      value: `$${(1950 + Math.random() * 100).toFixed(2)}`,
    },
    {
      label: '24h Change',
      value: `$${Math.abs(Math.random() * 40 - 20).toFixed(2)} (${(Math.random() * 2 - 1).toFixed(2)}%)`,
      className:
        Math.random() * 40 - 20 > 0 ? 'text-positive' : 'text-negative',
    },
    {
      label: '24h volume',
      value: `$${marketMetric.volume_24h.toLocaleString()}`,
    },
    {
      label: 'Open interest',
      value: `$${marketMetric.open_interest.toLocaleString()}`,
    },
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

export function TradeMarketInfoMobile({
  marketMetric,
}: TradeRouteParams & { marketMetric: Tables<'market_metric'> }) {
  if (!marketMetric) return null

  const marketInfoItems = [
    { label: 'Index Price', value: '$29,876.45' },
    { label: 'Mark Price', value: '$29,912.33' },
    {
      label: '24h Change',
      value: '$892.45 (3.12%)',
      className: 'text-positive',
    },
    {
      label: '24h volume',
      value: `$${marketMetric.volume_24h.toLocaleString()}`,
    },
    {
      label: 'Open interest',
      value: `$${marketMetric.open_interest.toLocaleString()}`,
    },
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
