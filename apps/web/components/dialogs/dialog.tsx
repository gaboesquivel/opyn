'use client'

import { useCmdK } from '@/lib/hooks'
import { Dialog } from '@opyn/ui'
import { useQueryState } from 'nuqs'
import type * as React from 'react'
import { ComparePerps } from './compare-perps'
import { DepositWithdraw } from './deposit-withdraw'
import MarketSearch from './market-search'

export function OpynDialog() {
  const [dialog, setDialog] = useQueryState('dialog', {
    defaultValue: '',
    clearOnDefault: true,
  })

  const content = dialogs[dialog]

  useCmdK(() => {
    setDialog('marketsearch')
  })

  // id dialog component is not found we dont try to display it
  return (
    <Dialog
      open={Boolean(content)}
      onOpenChange={(open) => !open && setDialog('')}
    >
      <div className="max-h-[100dvh] overflow-y-auto">{content}</div>
    </Dialog>
  )
}

const dialogs: Record<string, React.ReactNode> = {
  deposit: <DepositWithdraw />,
  withdraw: <DepositWithdraw />,
  compare: <ComparePerps />,
  marketsearch: <MarketSearch />,
}
