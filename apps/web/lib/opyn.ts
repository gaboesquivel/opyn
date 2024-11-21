import type { OpynMarket } from '@/types/opyn'

export function getMarketSlug(market: OpynMarket) {
  return `${market.underlier?.symbol}-${market.numeraire?.symbol}-${market.id}`
}

export function parseMarketSlug(slug: string): {
  underlierSymbol: string
  numeraireSymbol: string
  marketId: string
} {
  // hotfix for mobile ai slug
  if (!slug) return { underlierSymbol: '', numeraireSymbol: '', marketId: '' }

  const parts = slug.split('-')
  if (parts.length !== 3) throw new Error('Invalid market slug format')

  const [underlierSymbol, numeraireSymbol, marketId] = parts
  return { underlierSymbol, numeraireSymbol, marketId }
}

export function getMarketLabel(market: OpynMarket) {
  console.log('🤠 market', market)
  return `${market.underlier?.symbol}-${market.numeraire?.symbol}`
}

export function getMarketLabelFromSlug(marketSlug: string) {
  const { underlierSymbol, numeraireSymbol } = parseMarketSlug(marketSlug)
  return `${underlierSymbol}-${numeraireSymbol}`
}
