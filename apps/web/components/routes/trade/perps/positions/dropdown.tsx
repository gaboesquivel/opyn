'use client'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@opyn/ui'
import { MoreVertical } from 'lucide-react'
import { useQueryState } from 'nuqs'

export function PositionsDropdownMenu() {
  const [_, setDialog] = useQueryState('dialog', {
    defaultValue: '',
    clearOnDefault: true,
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-zinc-800 text-zinc-100">
        <DropdownMenuItem onClick={() => setDialog('withdraw')}>
          Withdraw collateral
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDialog('deposit')}>
          Deposit collateral
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
