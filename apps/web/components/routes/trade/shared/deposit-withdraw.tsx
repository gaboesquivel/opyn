'use client'

import { Button } from '@/components/ui/button'
import { useQueryState } from 'nuqs'

export function DepositWithdrawButtons() {
  const [_, setDialog] = useQueryState('dialog')
  return (
    <div className="flex gap-2 md:gap-4">
      <Button size="xs" onClick={() => setDialog('withdraw')}>
        Withdraw
      </Button>
      <Button size="xs" onClick={() => setDialog('deposit')}>
        Deposit
      </Button>
    </div>
  )
}
