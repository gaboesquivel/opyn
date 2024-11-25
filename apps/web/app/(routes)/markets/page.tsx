import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { MarketsTable } from "@/components/routes/markets/base-markets/markets-table"
import { MarketSearchInput } from "@/components/routes/markets/search-input"

export default function MarketsPage() {

  return (
    <div className="bg-background px-28 py-14">
      <div className="mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold">Markets</h1>
          <Button size="default" variant="brand">
            Deploy a market →
          </Button>
        </div>


        <div className="grid gap-4 md:grid-cols-2">
          <Card className="px-8 py-6 flex flex-col items-start justify-start gap-3">
            <CardHeader className="flex flex-row w-full gap-2 items-end p-0 sm:py-0 font-normal">
              <CardTitle className="text-gray-400 font-normal text-lg">Trading Volume</CardTitle>
              <div className="px-2 py-1 m-0 bg-gray-800 rounded text-sm">24h</div>
            </CardHeader>
            <CardContent className="p-0 sm:p-0">
              <h2 className="text-2xl font-medium font-mono">
                {formatCurrency({value: 98786757890})}
              </h2>
            </CardContent>
          </Card>
          <Card className="px-8 py-6 flex flex-col items-start justify-start gap-3">
            <CardHeader className="flex flex-row w-full gap-2 items-end p-0 sm:py-0 font-normal">
              <CardTitle className="text-gray-400 font-normal text-lg">Open Interest</CardTitle>
              <div className="px-2 py-1 m-0 bg-gray-800 rounded text-sm">Current</div>
            </CardHeader>
            <CardContent className="p-0 sm:p-0">
              <h2 className="text-2xl font-medium font-mono">
                {formatCurrency({value: 152431409.91})}
              </h2>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <MarketSearchInput />
          </div>
          <div className="flex items-center gap-2">
            <Switch />
            <span className="text-sm text-gray-400">Your positions</span>
          </div>
        </div>

        <div className="overflow-hidden">
          <MarketsTable />
        </div>
      </div>
    </div>
  )
}

