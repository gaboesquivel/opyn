import type { Token } from '../types'

export const tokens: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    decimals: 18,
    chainId: 42161,
    chainType: 'evm',
    isStable: false,
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
    decimals: 8,
    chainId: 42161,
    chainType: 'evm',
    isStable: false,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    address: '0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07',
    decimals: 9,
    chainId: 42161,
    chainType: 'evm',
    isStable: false,
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    address: '0x565609fAF65B92F7be02468acF86f8979423e514',
    decimals: 18,
    chainId: 42161,
    chainType: 'evm',
    isStable: false,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    decimals: 6,
    chainId: 42161,
    chainType: 'evm',
    isStable: true,
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    decimals: 6,
    chainId: 42161,
    chainType: 'evm',
    isStable: true,
  },
]

export function getToken({
  symbol,
  chainId = 42161,
}: { symbol: string; chainId: number }) {
  return tokens.find(
    (token) => token.symbol === symbol && token.chainId === chainId,
  )
}
