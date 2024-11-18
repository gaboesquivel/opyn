import type { TradeType } from '../types'

export function getMarketData({
  trade,
  pair,
}: { trade: TradeType; pair: string }) {
  const markets = getMarkets({ trade })
  const selectedMarket = markets.find((market) => market.value === pair)

  if (!selectedMarket) throw new Error(`Invalid pair: ${pair}`)

  const [underlier, counterpart] = selectedMarket.label.split('-')

  return {
    indexPrice: Math.round((1950 + Math.random() * 100) * 100) / 100,
    markPrice: Math.round((1950 + Math.random() * 100) * 100) / 100,
    change24h: {
      value: Math.round((Math.random() * 40 - 20) * 100) / 100,
      percentage: Math.round((Math.random() * 2 - 1) * 100) / 100,
    },
    volume24h: Math.round(40000000 + Math.random() * 20000000),
    openInterest: Math.round(650000000 + Math.random() * 100000000),
    underlier,
    counterpart,
    pairLabel: selectedMarket.label,
  }
}

export function getMarkets({ trade }: { trade: TradeType }) {
  return generatePairs()
}

function generatePairs() {
  const assets = [
    'ETH',
    'BTC',
    'SOL',
    'AVAX',
    'ADA',
    'XRP',
    'DOT',
    'DOGE',
    'LINK',
    'UNI',
    'LTC',
    'BCH',
    'ALGO',
    'ATOM',
    'MATIC',
    'XLM',
    'VET',
    'EOS',
    'TRX',
    'FIL',
    'XTZ',
    'AAVE',
    'GRT',
    'MKR',
    'COMP',
    'SNX',
    'YFI',
    'SUSHI',
    'NEAR',
    'ZEC',
    'DASH',
    'XMR',
    'CAKE',
    'ENJ',
    'BAT',
    'ZRX',
    'REN',
    'BNT',
    'KNC',
    'OMG',
    'ICX',
    'WAVES',
    'ONT',
    'DGB',
    'SC',
    'ZIL',
    'QTUM',
    'KSM',
    'NANO',
    'IOTA',
    'NEO',
    'THETA',
    'EGLD',
    'FTM',
  ]

  const stablecoins = ['USDC', 'USDT', 'DAI', 'BUSD']

  const pairs = []

  for (const asset of assets) {
    for (const stablecoin of stablecoins) {
      pairs.push({
        value: `${asset}${stablecoin}`,
        label: `${asset}-${stablecoin}`,
      })
    }
  }

  return pairs.slice(0, 108) // Return exactly 108 pairs
}
