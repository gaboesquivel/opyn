import { parseMarketSlug } from '@/lib/opyn'
// DEPRECATED: this is a mocked hook, we will prolly not use this strategy
import {
  getAccountInfo,
  getAccountPosition,
  getAccountPositions,
  getMarketData,
  getMarkets,
  useSupabaseClient,
} from '@/services/supabase'
import type { MarketType } from '@/types/opyn'
import type { Database } from '@opyn/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import type { TradeRouteParams } from '../routing'

// returns all data for the trade routes
export function useTradeData({ marketType, marketSlug }: TradeRouteParams) {
  const { marketId } = parseMarketSlug(marketSlug)
  const supabase = useSupabaseClient()
  return useQuery({
    queryKey: ['trade', marketType, marketId],
    queryFn: () => getTradeRouteData({ marketType, marketId, supabase }),
    refetchInterval: 5000,
  })
}

// DEPRECATED: this is a mock function
export async function getTradeRouteData({
  marketType,
  marketId,
  account,
  supabase,
}: {
  marketType: MarketType
  marketId: string
  account?: string
  supabase: SupabaseClient<Database>
}) {
  return {
    marketMetric: await getMarketData({ marketId, supabase }),
    markets: await getMarkets({ marketType, supabase }),
    account: {
      info: await getAccountInfo(account),
      position: await getAccountPosition(marketId),
      positions: await getAccountPositions(account || '0x'),
    },
    marketType,
    marketId,
  }
}
