import type { AIBot, MarketType, PerpType, TradeSide } from '@/types/opyn'

export type TradeRouteParams = {
  marketSlug: string
  marketType: MarketType
}

export type TradeSearchParams = {
  perp?: PerpType
  side?: TradeSide
  bot?: AIBot
  postab?: PosTab
}

export type PosTab = 'positions' | 'orders' | 'history'
