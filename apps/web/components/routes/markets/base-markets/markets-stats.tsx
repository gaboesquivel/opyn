import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { createSupabaseServerClient, getAllMarketsOverview } from "@/services/supabase"
import { LoaderIcon, TriangleAlertIcon } from "lucide-react"


export default async function MarketsStats() {

  const client = await createSupabaseServerClient()
  const aggregatedMetrics = await getAllMarketsOverview({ supabase: client })

  return (
    <Suspense fallback={<LoaderIcon className="w-6 h-6 text-gray-400 animate-spin" />}>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="px-8 py-6 flex flex-col items-start justify-start gap-3">
          <CardHeader className="flex flex-row w-full gap-2 items-end p-0 sm:py-0 font-normal">
            <CardTitle className="text-gray-400 font-normal text-lg">Trading Volume</CardTitle>
            <div className="px-2 py-1 m-0 bg-gray-800 rounded text-sm">24h</div>
          </CardHeader>
          <CardContent className="p-0 sm:p-0">
            <h2 className="text-2xl font-medium font-mono">
              {aggregatedMetrics ? (
                formatCurrency({ value: aggregatedMetrics.total_volume_24h || 0 })
              ) : (
                <TriangleAlertIcon className="w-6 h-6" />
              )}
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
              {aggregatedMetrics ? (
                formatCurrency({ value: aggregatedMetrics.total_open_interest || 0 })
              ) : (
                <TriangleAlertIcon className="w-6 h-6" />
              )}
            </h2>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  )
}