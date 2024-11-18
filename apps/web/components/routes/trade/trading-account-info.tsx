'use client'

import { Card } from '@/components/ui/card'
import { InfoIcon } from 'lucide-react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { WidtdrawDeposit } from './trading-widthdraw-deposit'

export default function TradingAccountInfo() {
  return (
    <Card
      variant="padded"
      className="items-center justify-between flex text-sm w-full gap-10 flex sm:max-h-[56px] py-4 sm:py-0 h-full sm:h-14 self-start flex-col sm:flex-row"
    >
      {/* Mobile */}
      <div className="w-full sm:hidden grid grid-cols-2 gap-4">
        <InfoItem label="Equity" value={accountData.equity} />
        <InfoItem
          label="Health"
          value={
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 font-medium">
                {accountData.health.status}
              </span>
              <div className="w-16 h-2 bg-gray-700 rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${accountData.health.percentage}%` }}
                />
              </div>
            </div>
          }
          icon={<InfoIcon className="w-4 h-4 ml-1 text-gray-500" />}
        />
        <InfoItem
          label="Liquidation (low)"
          value={accountData.liquidationLow}
        />
        <InfoItem
          label="Liquidation (high)"
          value={accountData.liquidationHigh}
        />
        <InfoItem
          label="Your net funding"
          value={accountData.netFunding}
          valueClassName="text-positive"
        />
      </div>

      <OverlayScrollbarsComponent defer className="w-full ">
        <div className="w-full flex justify-between my-4 gap-10 hidden sm:flex">
          <div className="min-w-[80px]">
            <div className="text-neutral-light">Equity</div>
            <div className="">{accountData.equity}</div>
          </div>
          <div className="min-w-[100px]">
            <div className="flex items-center text-neutral-light">
              Health
              <InfoIcon className="w-4 h-4 ml-1 text-gray-500" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 font-medium">
                {accountData.health.status}
              </span>
              <div className="w-16 h-2 bg-gray-700 rounded-full">
                <div
                  className={`w-${accountData.health.percentage}/100 h-full bg-yellow-500 rounded-full`}
                />
              </div>
            </div>
          </div>
          <div className="min-w-[120px]">
            <div className="text-neutral-light">Liquidation (low)</div>
            <div className="">{accountData.liquidationLow}</div>
          </div>
          <div className="min-w-[120px]">
            <div className="text-neutral-light">Liquidation (high)</div>
            <div className="">{accountData.liquidationHigh}</div>
          </div>
          <div className="min-w-[120px]">
            <div className="text-neutral-light">Your net funding</div>
            <div className="text-positive">{accountData.netFunding}</div>
          </div>
        </div>
      </OverlayScrollbarsComponent>
      {/* Desktop */}

      <div className="hidden sm:flex space-x-2">
        <WidtdrawDeposit />
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

interface AccountInfo {
  equity: string
  health: {
    status: string
    percentage: number
  }
  liquidationLow: string
  liquidationHigh: string
  netFunding: string
}

const accountData: AccountInfo = {
  equity: '$2,000.00',
  health: {
    status: 'Fair',
    percentage: 33,
  },
  liquidationLow: '$3,000.00',
  liquidationHigh: '$3,500.00',
  netFunding: '+0.084%',
}
