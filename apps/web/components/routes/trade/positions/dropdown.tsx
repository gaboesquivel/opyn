'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { useTradeRoute } from '../hooks/use-trade-route'

export function PositionsDropdownMenu() {
  const { setRouteStates } = useTradeRoute()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-zinc-800 text-zinc-100">
        <DropdownMenuItem
          onClick={() => setRouteStates({ dialog: 'withdraw' })}
        >
          Withdraw collateral
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRouteStates({ dialog: 'deposit' })}>
          Deposit collateral
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
