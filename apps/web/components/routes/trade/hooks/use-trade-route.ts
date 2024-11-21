import { parseMarketSlug } from '@/lib/opyn'
import { useParams } from 'next/navigation'
import { parseAsFloat, parseAsString, useQueryStates } from 'nuqs'
import type { TradeRouteParams } from '../routing'

// returns all relevant route and search params in /trade pages
// setRouteStates is used to update the search params

// TODO: discuss if we want make this the cannonical source of truth for trade route and search params

export function useTradeRoute() {
  const { marketType, marketSlug } = useParams<TradeRouteParams>()
  const [states, setRouteStates] = useQueryStates(
    {
      perp: parseAsFloat.withDefault(1),
      side: parseAsString.withDefault('long'),
      dialog: parseAsString,
      bot: parseAsString,
    },
    { clearOnDefault: true },
  )

  return {
    ...states,
    marketType,
    marketSlug,
    setRouteStates,
    ...parseMarketSlug(marketSlug),
  }
}
