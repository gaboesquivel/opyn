'use client'

import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { TradingViewChart } from '@opyn/charts'
import { Button } from '@opyn/ui'
import { Card, CardHeader } from '@opyn/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@opyn/ui'
import Link from 'next/link'

export function OpynSpotChart({
  underlierSymbol,
  numeraireSymbol,
}: {
  underlierSymbol: string
  numeraireSymbol: string
}) {
  return (
    <Card className="flex flex-col h-full max-h-full flex-1 pb-0 m-0">
      <CardHeader className="flex flex-col h-full w-full ">
        <div className="flex flex-row items-center justify-between space-y-0 h-full w-full">
          <div className="flex  w-full h-full">
            <Tabs
              defaultValue="price"
              className="flex flex-col flex-1 w-full h-full"
            >
              <div className="flex justify-between w-full">
                <TabsList className="bg-subtle h-9">
                  <TabsTrigger value="price" variant={'primary'}>
                    price
                  </TabsTrigger>
                </TabsList>
                <Button
                  variant="subtle"
                  size="sm"
                  className="flex items-center"
                  asChild
                >
                  <Link href="/trade/advanced">
                    <span className="sm:hidden">Details</span>
                    <span className="hidden sm:inline">Market Details</span>
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
            </Tabs>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
