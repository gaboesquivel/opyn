import type { getMarketData, getMarkets } from '@opyn/supabase'

export type MarketType = 'spot' | 'perps' | 'vaults' | 'advanced'
export type PerpType = '1' | '0.5' | '2'
export type TradeSide = 'long' | 'short'
export type AIBot = 'opyn' | 'degen' | 'trump'

export type OpynMarket = Awaited<ReturnType<typeof getMarkets>>[number]

export type MarketData = Awaited<ReturnType<typeof getMarketData>>

export type PosTab = 'positions' | 'orders' | 'history'
