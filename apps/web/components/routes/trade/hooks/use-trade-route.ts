import { useParams } from 'next/navigation'
import { parseAsFloat, parseAsString, useQueryStates } from 'nuqs'
import type { TradeRouteParams } from '../routing'

// return all params in the pathname + query params
export function useTradeRoute() {
  const { trade, marketSlug } = useParams<TradeRouteParams>()
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
    trade,
    marketSlug,
    setRouteStates,
  }
}
