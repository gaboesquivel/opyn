import type { Abi, Address } from 'viem'

export type MarketContractName =
  | 'Controller'
  | 'Factory'
  | 'Feeder'
  | 'Redemption'
  | 'Shutdown'

export type MarketAddresses = Record<MarketContractName, Address>
export type MarketAbis = Record<MarketContractName, Abi>
