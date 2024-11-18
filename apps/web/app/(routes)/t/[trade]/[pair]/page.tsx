import { OpynAi } from '@/components/opyn-ai'
import type {
  TradeRouteParams,
  TradeSearchParams,
} from '@/components/routes/trade/routing'
import { TradingDashboard } from '@/components/routes/trade/trading-dashboard'
import { TradingMarketInfo } from '@/components/routes/trade/trading-market-info'
import { TradingPositions } from '@/components/routes/trade/trading-positions'
import { getMarket } from '@/services/supabase/api'
import { createSupabaseServerClient } from '@/services/supabase/server'
import dynamic from 'next/dynamic'

export default async function TradePage({
  params,
  searchParams,
}: TradePageProps) {
  const { pair, trade } = params
  const bot = searchParams.bot

  const market = await getMarket(pair)
  const baseAsset = market.base_token[0].symbol
  const quoteAsset = market.quote_token[0].symbol

  console.log(baseAsset, quoteAsset)

  return (
    <TradingDashboard
      nav={<TradingNav pair={pair} trade={trade} />}
      account={<TradingAccountInfo />}
      sidebar={bot ? <OpynAi /> : <TradingSidebar pair={pair} trade={trade} />}
      market={<TradingMarketInfo pair={pair} trade={trade} />}
      marketMobile={<TradingMarketInfoMobile pair={pair} trade={trade} />}
      chart={<TradingViewWidget pair={pair} />}
      positions={<TradingPositions />}
      searchParams={searchParams}
      params={params}
    />
  )
}

const TradingSidebar = dynamic(
  () =>
    import('@/components/routes/trade/trading-sidebar').then(
      (mod) => mod.TradingSidebar,
    ),
  { ssr: false },
)

const TradingNav = dynamic(
  () =>
    import('@/components/routes/trade/trading-nav').then(
      (mod) => mod.TradingNav,
    ),
  { ssr: false },
)

const TradingViewWidget = dynamic(
  () =>
    import('@/components/routes/trade/trading-chart').then(
      (mod) => mod.TradingViewWidget,
    ),
  { ssr: false },
)

const TradingAccountInfo = dynamic(
  () =>
    import('@/components/routes/trade/trading-account-info').then(
      (mod) => mod.default,
    ),
  { ssr: false },
)

const TradingMarketInfoMobile = dynamic(
  () =>
    import('@/components/routes/trade/trading-market-info').then(
      (mod) => mod.TradingMarketInfoMobile,
    ),
  { ssr: false },
)

interface TradePageProps {
  params: TradeRouteParams
  searchParams: TradeSearchParams
}
