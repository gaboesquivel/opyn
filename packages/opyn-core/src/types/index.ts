import type { Abi, Address } from 'viem'

export type OpynContractName =
  | 'Controller'
  | 'Factory'
  | 'Feeder'
  | 'Redemption'
  | 'Shutdown'

export type MarketAddresses = Record<OpynContractName, Address>
export type MarketAbis = Record<OpynContractName, Abi>
