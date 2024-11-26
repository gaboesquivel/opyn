'use client'

import { useMarket } from '@opyn/hooks'
import { getChainlinkPriceByMarketId, useSupabaseClient } from '@opyn/supabase'
import type { Tables } from '@opyn/supabase'
import {
  Button,
  Card,
  OnePerpIcon,
  TwoPerpIcon,
  ZeroDotFivePerpIcon,
} from '@opyn/ui'
import { useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

export function TradeMarketData({
  marketMetric,
}: { marketMetric: Tables<'market_metric'> }) {
  const [perp, setPerp] = useQueryState('perp', { defaultValue: '1' })
  const { marketId } = useMarket()
  const supabase = useSupabaseClient()
  const { data: chainlinkPrice } = useQuery({
    queryKey: ['chainlinkPrice', marketId],
    queryFn: () => getChainlinkPriceByMarketId({ marketId, supabase }),
    enabled: !!marketId,
  })

  if (!marketMetric) return null

  const marketInfoItems = [
    {
      label: 'Index Price',
      value: '$1,235.67',
    },
    {
      label: 'Mark Price',
      value: '$1,235.67',
    },
    {
      label: '24h Change',
      value: '$12.34 (1.23%)',
      className: 'text-positive',
    },
    {
      label: '24h volume',
      value: `$${marketMetric.volume_24h}`,
    },
    {
      label: 'Open interest',
      value: `$${marketMetric.open_interest}`,
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
}: { marketMetric: Tables<'market_metric'> }) {
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
