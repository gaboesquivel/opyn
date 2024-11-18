import {
  type TradeType,
  getAccountInfo,
  getAccountPosition,
  getAccountPositions,
  getMarketData,
  getMarkets,
} from '@opyn/api'
import { useQuery } from '@tanstack/react-query'
import type { TradeRouteParams } from '../routing'

// returns all data for the trade routes
export function useTradeData({ trade, pair }: TradeRouteParams) {
  return useQuery({
    queryKey: ['trade', trade, pair],
    queryFn: () => getTradeRouteData({ trade, pair }),
    refetchInterval: 5000, // NOTE: this simulates a subscription
  })
}

export function getTradeRouteData({
  trade,
  pair,
  account,
}: { trade: string; pair: string; account?: string }) {
  // NOTE: this simulates a graphql query
  return {
    market: getMarketData({ trade: trade as TradeType, pair: pair as string }),
    markets: getMarkets({ trade: trade as TradeType }),
    account: {
      info: getAccountInfo(account),
      position: getAccountPosition(pair),
      positions: getAccountPositions(account || '0x'),
    },
    trade,
    pair,
  }
}
