import { formatCurrency } from '@opyn/lib'
import {
  createSupabaseServerClient,
  getAllMarketsOverview,
} from '@opyn/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@opyn/ui'
import { LoaderIcon, TriangleAlertIcon } from 'lucide-react'
import { Suspense } from 'react'

const isValidMetrics = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  metrics: any,
): metrics is { total_volume_24h: number; total_open_interest: number } =>
  metrics && !metrics.error

export default async function MarketsStats() {
  const client = await createSupabaseServerClient()
  const aggregatedMetrics = await getAllMarketsOverview({ supabase: client })

  return (
    <Suspense
      fallback={<LoaderIcon className="w-6 h-6 text-gray-400 animate-spin" />}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="px-8 py-6 flex flex-col items-start justify-start gap-3">
          <CardHeader className="flex flex-row w-full gap-2 items-end p-0 sm:py-0 font-normal">
            <CardTitle className="text-gray-400 font-normal text-lg">
              Trading Volume
            </CardTitle>
            <div className="px-2 py-1 m-0 bg-gray-800 rounded text-sm">24h</div>
          </CardHeader>
          <CardContent className="p-0 sm:p-0">
            <h2 className="text-2xl font-medium font-mono">
              {isValidMetrics(aggregatedMetrics) ? (
                formatCurrency({
                  value: aggregatedMetrics.total_volume_24h || 0,
                })
              ) : (
                <TriangleAlertIcon className="w-6 h-6" />
              )}
            </h2>
          </CardContent>
        </Card>
        <Card className="px-8 py-6 flex flex-col items-start justify-start gap-3">
          <CardHeader className="flex flex-row w-full gap-2 items-end p-0 sm:py-0 font-normal">
            <CardTitle className="text-gray-400 font-normal text-lg">
              Open Interest
            </CardTitle>
            <div className="px-2 py-1 m-0 bg-gray-800 rounded text-sm">
              Current
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-0">
            <h2 className="text-2xl font-medium font-mono">
              {isValidMetrics(aggregatedMetrics) ? (
                formatCurrency({
                  value: aggregatedMetrics.total_open_interest,
                })
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
