import type { getMarketData, getMarkets } from '@/services/supabase'
export type MarketType = 'spot' | 'perps' | 'vaults'
export type PerpType = '1' | '0.5' | '2'
export type TradeSide = 'long' | 'short'
export type AIBot = 'opyn' | 'degen' | 'trump'

export type OpynMarket = Awaited<ReturnType<typeof getMarkets>>[number]

// NOTE: this is a mock type, will be replaced by Tables<'market_metric'>
export type MarketData = Awaited<ReturnType<typeof getMarketData>>
