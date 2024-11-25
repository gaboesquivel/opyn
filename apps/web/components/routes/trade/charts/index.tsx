'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQueryState } from 'nuqs'
import { FundingChart } from './funding'
import { PayoffChart } from './payoff'
import { TradingViewChart } from './trading-view'

export function OpynCharts({
  underlierSymbol,
  numeraireSymbol,
}: {
  underlierSymbol: string
  numeraireSymbol: string
}) {
  const [chart, setChart] = useQueryState('chart', {
    defaultValue: 'price',
    clearOnDefault: true,
  })

  return (
    <Card className="flex flex-col h-full max-h-full flex-1 pb-0 m-0">
      <CardHeader className="flex flex-col h-full w-full ">
        <div className="flex flex-row items-center justify-between space-y-0 h-full w-full">
          <div className="flex  w-full h-full">
            <Tabs
              value={chart}
              onValueChange={(value) => setChart(value)}
              className="flex flex-col flex-1 w-full h-full"
            >
              <div className="flex justify-between w-full">
                <TabsList className="bg-subtle h-9">
                  {['price', 'funding', 'payoff'].map((value) => (
                    <TabsTrigger key={value} value={value} variant={'primary'}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <Button
                  variant="subtle"
                  size="sm"
                  className="flex items-center"
                >
                  <span className="sm:hidden">Details</span>
                  <span className="hidden sm:inline">Market Details</span>
                </Button>
              </div>
              <TabsContent value="price" className="flex-1 h-full w-full mt-4">
                <TradingViewChart
                  underlierSymbol={underlierSymbol}
                  numeraireSymbol={numeraireSymbol}
                />
              </TabsContent>
              <TabsContent value="funding" className="flex-1 h-full w-full">
                <FundingChart />
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
