'use client'

import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import {
  FundingChart,
  type FundingDataPoint,
  PayoffChart,
  TradingViewChart,
} from '@opyn/charts'
import { Button } from '@opyn/ui'
import { Card, CardHeader } from '@opyn/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@opyn/ui'
import Link from 'next/link'

export function OpynCharts({
  underlierSymbol,
  numeraireSymbol,
  data,
  chartType,
}: {
  underlierSymbol: string
  numeraireSymbol: string
  data: FundingDataPoint[]
  chartType: 'price' | 'funding' | 'payoff'
}) {
  return (
    <Card className="flex flex-col h-full max-h-full flex-1 pb-0 m-0">
      <CardHeader className="flex flex-col h-full w-full ">
        <div className="flex flex-row items-center justify-between space-y-0 h-full w-full">
          <div className="flex  w-full h-full">
            <Tabs
              value={chartType}
              className="flex flex-col flex-1 w-full h-full"
            >
              <div className="flex justify-between w-full">
                <TabsList className="bg-subtle h-9">
                  {['price', 'funding', 'payoff'].map((value) => (
                    <Link
                      key={value}
                      href={{ query: { chart: value } }}
                      className="contents"
                    >
                      <TabsTrigger value={value} variant={'primary'}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                      </TabsTrigger>
                    </Link>
                  ))}
                </TabsList>
                <Button
                  variant="subtle"
                  size="sm"
                  className="flex items-center"
                  asChild
                >
                  <Link href="/trade/advanced">
                    <span className="sm:hidden">Advanced</span>
                    <span className="hidden sm:inline">Advanced Trading</span>
                    <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <TabsContent value="price" className="flex-1 h-full w-full mt-4">
                <TradingViewChart
                  underlierSymbol={underlierSymbol}
                  numeraireSymbol={numeraireSymbol}
                />
              </TabsContent>
              <TabsContent value="funding" className="flex-1 h-full w-full">
                <FundingChart data={data} />
              </TabsContent>
              <TabsContent value="payoff" className="flex-1 h-full w-full">
                <PayoffChart />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
