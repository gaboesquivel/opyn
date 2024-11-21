'use client'

import { CurrencyIcon } from '@/components/shared/icons'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getMarketLabelFromSlug, parseMarketSlug } from '@/lib/opyn'
import { useRouter } from 'next/navigation'
import { DepositWithdrawButtons } from './deposit-withdraw'
import { useTradeRoute } from './hooks/use-trade-route'
import type { TradeRouteParams } from './routing'

export function TradeNav({ marketSlug, marketType }: TradeRouteParams) {
  const router = useRouter()
  const { underlierSymbol, numeraireSymbol } = parseMarketSlug(marketSlug)
  const { setRouteStates } = useTradeRoute()
  const marketLabel = getMarketLabelFromSlug(marketSlug)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full flex-1 sm:min-h-14">
      <div className="w-full sm:w-[180px] order-2 sm:order-1 flex flex-row justify-between sm:block mr-4">
        <Select
          value={marketLabel}
          onValueChange={(marketSlug) =>
            router.push(`/trade/${marketType}/${marketSlug}`)
          }
        >
          <SelectTrigger
            className="w-1/2 sm:w-full sm:min-w-[200px] h-9 sm:h-[56px] text-lg font-medium"
            onClick={() => setRouteStates({ dialog: 'marketsearch' })}
          >
            <SelectValue>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  <CurrencyIcon currency={underlierSymbol} />
                  <CurrencyIcon currency={numeraireSymbol} />
                </div>
                <span>{marketLabel}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
        </Select>
        <div className="sm:hidden w-1/2 flex items-center justify-center">
          <DepositWithdrawButtons />
        </div>
      </div>

      <Tabs
        value={marketType}
        onValueChange={(selectedMarketType) =>
          router.push(`/trade/${selectedMarketType}/${marketSlug}`)
        }
        className="hidden sm:flex w-full sm:w-2/3 order-1 sm:order-2"
      >
        <TabsList className="h-9 sm:h-[56px] w-full">
          {['perps', 'spot', 'vaults'].map((tabValue) => (
            <TabsTrigger
              key={tabValue}
              value={tabValue}
              className="px-4 py-2 h-9 sm:h-[56px] text-lg font-light flex-1"
            >
              {tabValue.charAt(0).toUpperCase() + tabValue.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
