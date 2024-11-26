import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@opyn/ui'
import { CardContent } from '@opyn/ui'
import { ChevronDown } from 'lucide-react'
import { PositionsDropdownMenu } from './dropdown'

export function OrdersTable({
  scrollableHeight,
}: { scrollableHeight: number }) {
  return (
    <CardContent className="flex-grow">
      <div
        style={{ height: scrollableHeight }}
        className="overflow-auto pb-20 "
      >
        <Table className="swiper-no-swiping">
          <TableHeader>
            <TableRow className="border-b border-zinc-800">
              <TableHead className="text-left text-zinc-400">
                Position
              </TableHead>
              <TableHead className="text-right text-zinc-400">
                Size
                <ChevronDown className="ml-1 inline-block h-4 w-4" />
              </TableHead>
              <TableHead className="text-right text-zinc-400">
                Position Value
                <ChevronDown className="ml-1 inline-block h-4 w-4" />
              </TableHead>
              <TableHead className="text-right text-zinc-400">
                Mark price
                <ChevronDown className="ml-1 inline-block h-4 w-4" />
              </TableHead>
              <TableHead className="text-right text-zinc-400">
                PnL
                <ChevronDown className="ml-1 inline-block h-4 w-4" />
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: 'ETH Perp', type: 'Long', color: 'text-green-500' },
              { name: 'BTC Perp', type: 'Short', color: 'text-red-500' },
              { name: 'AAVE LP', type: 'Collateral', icon: '○' },
              { name: 'SOL Perp', type: 'Long', color: 'text-green-500' },
              { name: 'MATIC Perp', type: 'Short', color: 'text-red-500' },
              { name: 'UNI LP', type: 'Collateral', icon: '○' },
              { name: 'LINK Perp', type: 'Long', color: 'text-green-500' },
              { name: 'DOT Perp', type: 'Short', color: 'text-red-500' },
              { name: 'SUSHI LP', type: 'Collateral', icon: '○' },
              { name: 'AVAX Perp', type: 'Long', color: 'text-green-500' },
              { name: 'ADA Perp', type: 'Short', color: 'text-red-500' },
              { name: 'COMP LP', type: 'Collateral', icon: '○' },
              { name: 'DOGE Perp', type: 'Long', color: 'text-green-500' },
              { name: 'XRP Perp', type: 'Short', color: 'text-red-500' },
              { name: 'CAKE LP', type: 'Collateral', icon: '○' },
              { name: 'FTM Perp', type: 'Long', color: 'text-green-500' },
              { name: 'ATOM Perp', type: 'Short', color: 'text-red-500' },
              { name: 'BAL LP', type: 'Collateral', icon: '○' },
              { name: 'NEAR Perp', type: 'Long', color: 'text-green-500' },
              { name: 'ALGO Perp', type: 'Short', color: 'text-red-500' },
            ].map((position) => (
              <TableRow
                key={position.name}
                className="border-b border-zinc-800 p-2 m-0"
              >
                <TableCell className="font-medium p-2 m-0">
                  {position.icon && (
                    <span className="mr-2">{position.icon}</span>
                  )}
                  {position.name}{' '}
                  <span className={position.color || 'text-zinc-400'}>
                    {position.type}
                  </span>
                </TableCell>
                <TableCell className="text-right p-2 m-0">
                  {(Math.random() * 50).toFixed(1)}
                </TableCell>
                <TableCell className="text-right p-2 m-0">
                  ${(Math.random() * 10000).toFixed(2)}
                </TableCell>
                <TableCell className="text-right p-2 m-0">
                  ${(Math.random() * 5000).toFixed(2)}
                </TableCell>
                <TableCell className="text-right p-2 m-0">
                  <span className="text-green-500">
                    +${(Math.random() * 500).toFixed(2)}
                    <br />+{(Math.random() * 10).toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="p-0 m-0">
                  <PositionsDropdownMenu />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  )
}
