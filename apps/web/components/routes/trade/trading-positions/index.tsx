'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ResizablePanel } from '@/components/ui/resizable'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronDown } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import type { PosTab } from '../routing'
import { PositionsDropdownMenu } from './dropdown'

// wrapper for resizable panel
export function TradingPositions() {
  const [scrollableHeight, setScrollableHeight] = useState(200)

  return (
    <ResizablePanel
      defaultSize={40}
      className="w-full mt-4"
      onResize={(panelHeight: number) => {
        setScrollableHeight(Math.floor(panelHeight * 5))
      }}
    >
      <TradingPositionsCard scrollableHeight={scrollableHeight} />
    </ResizablePanel>
  )
}

// TradingPositionsCard component
export function TradingPositionsCard({
  scrollableHeight,
}: {
  scrollableHeight?: number
}) {
  const [posTab, setPosTab] = useQueryState<PosTab>('postab', {
    defaultValue: 'positions',
    clearOnDefault: true,
    parse: (value) =>
      ['positions', 'orders', 'history'].includes(value)
        ? (value as PosTab)
        : ('positions' as PosTab),
  })
  return (
    <Card className="flex flex-col h-full flex-grow">
      <CardHeader className="flex-shrink-0 flex flex-row items-center justify-between space-y-0">
        <div className="flex space-x-2">
          <Tabs
            value={posTab}
            onValueChange={(value) => setPosTab(value as PosTab)}
          >
            <TabsList className="bg-subtle h-9">
              {['positions', 'orders', 'history'].map((value) => (
                <TabsTrigger key={value} value={value} variant="primary">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <Button variant="subtle" size="sm" className="hidden sm:inline-flex">
          Close all positions
        </Button>
        <Button variant="subtle" size="sm" className="sm:hidden">
          Close All
        </Button>
      </CardHeader>
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
                  <TableCell className="text-right p-2 m-0">
                    $3,580.09
                  </TableCell>
                  <TableCell className="text-right p-2 m-0">
                    $3,580.09
                  </TableCell>
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
    </Card>
  )
}
