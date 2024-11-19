import type { AIBot, PerpType, TradeSide, TradeType } from '@opyn/api'

export type TradeRouteParams = {
  marketSlug: string
  trade: TradeType
}

export type TradeSearchParams = {
  perp?: PerpType
  side?: TradeSide
  bot?: AIBot
  postab?: PosTab
}

export type PosTab = 'positions' | 'orders' | 'history'
