import { OpynAi } from '@/components/opyn-ai'
import type {
  TradeRouteParams,
  TradeSearchParams,
} from '@/components/routes/trade/routing'
import TradingAccountInfo from '@/components/routes/trade/trading-account-info'
import { TradingViewWidget } from '@/components/routes/trade/trading-chart'
import { TradingDashboard } from '@/components/routes/trade/trading-dashboard'
import {
  TradingMarketInfo,
  TradingMarketInfoMobile,
} from '@/components/routes/trade/trading-market-info'
import { TradingNav } from '@/components/routes/trade/trading-nav'
import { TradingPositions } from '@/components/routes/trade/trading-positions'
import { TradingSidebar } from '@/components/routes/trade/trading-sidebar'
import dynamic from 'next/dynamic'

export default async function TradePage({
  params,
  searchParams,
}: TradePageProps) {
  const { marketSlug, trade } = params
  const bot = searchParams.bot

  return (
    <TradingDashboard
      nav={<TradingNav marketSlug={marketSlug} trade={trade} />}
      account={<TradingAccountInfo />}
      sidebar={
        bot ? (
          <OpynAi />
        ) : (
          <TradingSidebar marketSlug={marketSlug} trade={trade} />
        )
      }
      market={<TradingMarketInfo marketSlug={marketSlug} trade={trade} />}
      mobileMarket={
        <TradingMarketInfoMobile marketSlug={marketSlug} trade={trade} />
      }
      chart={<TradingViewWidget pair={marketSlug.split('-')[0]} />}
      positions={<TradingPositions />}
      mobilePositions={<TradingPositionsCard key="trading-positions-card" />} // key required on swiper
    />
  )
}

// NOTE: dynamic since its not display on first render
const TradingPositionsCard = dynamic(
  () =>
    import('@/components/routes/trade/trading-positions/index').then(
      (mod) => mod.TradingPositionsCard,
    ),
  { ssr: false },
)

interface TradePageProps {
  params: TradeRouteParams
  searchParams: TradeSearchParams
}
