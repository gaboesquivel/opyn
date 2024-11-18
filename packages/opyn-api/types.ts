import type { Address } from 'viem'

export type TradeType = 'spot' | 'perps' | 'vaults'
export type PerpType = '1' | '0.5' | '2'
export type TradeSide = 'long' | 'short'
export type AIBot = 'opyn' | 'degen' | 'trump'

export interface OrderType {
  pair: string // used in route params
  type: 'market' | 'limit' | 'stop' | 'stopLimit' | 'trailingStop'
  side: TradeSide
  size: number
  price?: number
  stopPrice?: number
  trailingPercent?: number
  reduceOnly: boolean
  postOnly: boolean
  timeInForce: 'GTC' | 'IOC' | 'FOK'
  leverage: number
  marginType: 'cross' | 'isolated'
  slippage?: number
}

export interface MarketPosition {
  pair: string // used in route params
  size: number
  entryPrice: number
  liquidationPrice: number
  margin: number
  leverage: number
  unrealizedPnl: number
  realizedPnl: number
  marginType: 'cross' | 'isolated'
  side: TradeSide
  underlier: Token
  counterpart: Token
  collateral: number
  liq: {
    low: number
    high: number
  }
}

export interface MarketType {
  pair: string // used in route params
  tradeType: TradeType
  perpType: PerpType
  symbol: string
  baseAsset: string
  quoteAsset: string
  pricePrecision: number
  quantityPrecision: number
  minOrderSize: number
  maxLeverage: number
  fundingRate: number
  indexPrice: number
  markPrice: number
  lastPrice: number
  volume24h: number
  openInterest: number
}

export interface Token {
  address: Address
  name: string
  symbol: string
  image?: string
  decimals: number
  isStable: boolean
  chainId: number
  chainType: ChainType
}

export type ChainType = 'evm' | 'antelope' | 'solana' | 'cosmos'
