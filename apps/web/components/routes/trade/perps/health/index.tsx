'use client'

import { useMarket } from '@opyn/hooks'
import { formatCurrency } from '@opyn/lib'
import { useSupabaseClient } from '@opyn/supabase'
import { getPortfolioHealth, getUserMarketEquity } from '@opyn/supabase'
import { Card } from '@opyn/ui'
import { useQuery } from '@tanstack/react-query'
import { InfoIcon } from 'lucide-react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useAccount } from 'wagmi'
import { DepositWithdrawButtons } from '../../shared/deposit-withdraw'

export function TradeAccountHealth({ equity }: { equity: number }) {
  const supabase = useSupabaseClient()
  const { marketId } = useMarket()
  const { address } = useAccount()
  const { data: health } = useQuery({
    queryKey: ['portfolioHealth', marketId, address],
    queryFn: () => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      return getPortfolioHealth({ marketId, userAddress: address!, supabase })
    },
    enabled: !!address,
  })

  return (
    <Card
      variant="padded"
      className="items-center justify-between flex text-sm w-full gap-10 flex sm:max-h-[56px] py-4 sm:py-0 h-full sm:h-14 self-start flex-col sm:flex-row "
    >
      {/* Mobile */}
      <div className="w-full sm:hidden grid grid-cols-2 gap-4">
        <InfoItem
          key="equity"
          label="Equity"
          value={`${equity ? formatCurrency({ value: equity }) : '$0.0000'}`}
        />
        <InfoItem
          key="health"
          label="Health"
          value={
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 font-medium">Fair</span>
              <div className="w-16 h-2 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${health?.health_score ?? 0}%` }}
                />
              </div>
            </div>
          }
          icon={<InfoIcon className="w-4 h-4 ml-1 text-gray-500" />}
        />
        <InfoItem
          key="liquidation-low"
          label="Liquidation (low)"
          value={`$${health?.health_score ?? '0.0000'}`}
        />
        <InfoItem
          key="liquidation-high"
          label="Liquidation (high)"
          value={`$${health?.health_score ?? '0.0000'}`}
        />
        <InfoItem
          key="net-funding"
          label="Your net funding"
          value={`${health?.health_score ?? '0.0000'}%`}
          valueClassName="text-positive"
        />
      </div>

      <OverlayScrollbarsComponent defer className="w-full ">
        <div className="w-full flex justify-between my-4 gap-10 hidden sm:flex">
          <div className="min-w-[80px]">
            <div className="text-neutral-light">Equity</div>
            <div className="">{`${equity ? formatCurrency({ value: equity }) : '$0.0000'}`}</div>
          </div>
          <div className="min-w-[100px]">
            <div className="flex items-center text-neutral-light">
              Health
              <InfoIcon className="w-4 h-4 ml-1 text-gray-500" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 font-medium">
                {health?.health_score ?? '0.0000'}
              </span>
              <div className="w-16 h-2 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${health?.health_score ?? 0}%` }}
                />
              </div>
            </div>
          </div>
          <div className="min-w-[120px]">
            <div className="text-neutral-light">Liquidation (low)</div>
            <div className="">${health?.health_score ?? '0.0000'}</div>
          </div>
          <div className="min-w-[120px]">
            <div className="text-neutral-light">Liquidation (high)</div>
            <div className="">${health?.health_score ?? '0.0000'}</div>
          </div>
          <div className="min-w-[120px]">
            <div className="text-neutral-light">Your net funding</div>
            <div className="text-positive">
              {health?.health_score ?? '0.0000'}%
            </div>
          </div>
        </div>
      </OverlayScrollbarsComponent>
      {/* Desktop */}

      <div className="hidden sm:flex space-x-2">
        <DepositWithdrawButtons />
      </div>
    </Card>
  )
}

function InfoItem({
  label,
  value,
  icon,
  valueClassName = '',
}: {
  label: string
  value: React.ReactNode
  icon?: React.ReactNode
  valueClassName?: string
}) {
  return (
    <div className="min-w-[80px]">
      <div className="flex items-center text-neutral-light">
        {label}
        {icon}
      </div>
      <div className={valueClassName}>{value}</div>
    </div>
  )
}
