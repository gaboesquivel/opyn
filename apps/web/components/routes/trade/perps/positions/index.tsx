'use client'

import { useSupabaseClient } from '@opyn/supabase'
import { getAllTransactions } from '@opyn/supabase/src/api/transaction'
import type { PosTab } from '@opyn/types'
import { Button } from '@opyn/ui'
import { Card, CardHeader } from '@opyn/ui'
import {
  ResizablePanel,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@opyn/ui'

import { useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { HistoryTable } from './history'
import { OrdersTable } from './orders'
import { PositionsTable } from './positions'

export function TradePositions() {
  const [scrollableHeight, setScrollableHeight] = useState(200)
  const supabase = useSupabaseClient()
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getAllTransactions({ supabase }),
  })

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
        <div className="flex ">
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
      <Tabs value={posTab}>
        <TabsContent value="positions">
          <PositionsTable scrollableHeight={scrollableHeight ?? 0} />
        </TabsContent>
        <TabsContent value="orders">
          <OrdersTable scrollableHeight={scrollableHeight ?? 0} />
        </TabsContent>
        <TabsContent value="history">
          <HistoryTable scrollableHeight={scrollableHeight ?? 0} />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
