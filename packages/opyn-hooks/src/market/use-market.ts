'use client'
import { parseMarketSlug } from '@opyn/lib'
/**
 * Hook to get the parsed market slug from the URL params
 * Returns the underlier and numeraire symbols from the market slug
 * Example: "eth-usdc-0x1" returns { underlierSymbol: "ETH", numeraireSymbol: "USDC", marketId: "0x1" }
 */
// import { parseMarketSlug } from '@opyn/lib'
import type { MarketType, PerpType, TradeSide } from '@opyn/types'
import { useParams, usePathname } from 'next/navigation'
import { useQueryState } from 'nuqs'

export function useMarket() {
  const pathname = usePathname()
  const marketType = pathname.split('/')[2] as MarketType // perps, spot, vaults, advanced
  const { marketSlug } = useParams<{ marketSlug: string }>()
  const [perp] = useQueryState<PerpType>('perp', {
    defaultValue: '1',
    parse: (value) => value as PerpType,
  })
  const [side] = useQueryState<TradeSide>('side', {
    defaultValue: 'long',
    parse: (value) => value as TradeSide,
  })
  return { marketSlug, marketType, side, perp, ...parseMarketSlug(marketSlug) }
}
