import {
  createSupabaseServerClient,
  getAggregatedMarketMetrics,
} from '@opyn/supabase'
import { TableBody } from '@opyn/ui'
import type { MarketsPageSearchParams } from '../types'
import { MarketRow } from './market-row'
import { SortKey } from './table.types'

const generateData = (points: number, trend: 'up' | 'down') =>
  Array.from({ length: points }, (_, i) => ({
    value:
      trend === 'up'
        ? 50 + Math.random() * 50 + i
        : 100 - (Math.random() * 50 + i),
  }))

export async function MarketTableBody({
  searchParams,
}: { searchParams: MarketsPageSearchParams }) {
  const supabase = createSupabaseServerClient()

  const data = await getAggregatedMarketMetrics({
    sortField:
      searchParams.sortBy === SortKey.volume ||
      searchParams.sortBy === SortKey.oi
        ? searchParams.sortBy
        : 'num_markets',
    sortDirection: searchParams.order as 'ASC' | 'DESC',
    query: searchParams.query || '',
    supabase,
  })

  const marketData = data?.map((item) => ({
    icon: item?.underlier_asset_image_url,
    name: item?.underlier_asset_name,
    markets: item?.num_markets,
    price: 3000.0,
    change: 5.83,
    volume: item?.total_volume_24h,
    oi: item?.total_open_interest,
    data: generateData(20, 'up'),
    trend: 'up',
  }))

  return (
    <TableBody>
      {marketData.map((market) => (
        <MarketRow
          key={market.name}
          icon={market.icon}
          name={market.name}
          markets={market.markets}
          price={market.price}
          change={market.change}
          volume={market.volume}
          oi={market.oi}
          data={market.data}
          trend={market.trend as 'up' | 'down'}
        />
      ))}
    </TableBody>
  )
}
