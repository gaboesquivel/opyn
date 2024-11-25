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

export function PositionsTable({
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
              { name: '1 Perp', type: 'Long', color: 'text-green-500' },
              { name: '2 Perp', type: 'Short', color: 'text-red-500' },
              { name: 'Uni LP', type: 'Collateral', icon: '○' },
              { name: 'ETH-FLO', type: 'Vault' },
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
                <TableCell className="text-right p-2 m-0">19.1</TableCell>
                <TableCell className="text-right p-2 m-0">$3,580.09</TableCell>
                <TableCell className="text-right p-2 m-0">$3,580.09</TableCell>
                <TableCell className="text-right p-2 m-0">
                  <span className="text-green-500">
                    +$184.00
                    <br />
                    +3.13%
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
