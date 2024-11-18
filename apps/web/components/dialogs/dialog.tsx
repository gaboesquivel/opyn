'use client'

import { Dialog } from '@/components/ui/dialog'
import { useQueryState } from 'nuqs'
import * as React from 'react'
import { ComparePerps } from './compare-perps'
import { DepositWithdraw } from './deposit-withdraw'
import MarketSearch from './market-search'

export function OpynDialog() {
  const [dialog, setDialog] = useQueryState('dialog', {
    defaultValue: '',
    clearOnDefault: true,
  })

  const content = dialogs[dialog]

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setDialog('marketsearch')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setDialog])

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
