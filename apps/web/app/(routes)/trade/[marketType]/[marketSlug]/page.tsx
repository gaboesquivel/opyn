import { OpynAi } from '@/components/opyn-ai'
import { TradeDashboard } from '@/components/routes/trade/dashboard'
import { TradeAccountHealth } from '@/components/routes/trade/health'
import {
  TradeMarketData,
  TradeMarketInfoMobile,
} from '@/components/routes/trade/market'
import { TradeNav } from '@/components/routes/trade/nav'
import { TradeOrder } from '@/components/routes/trade/order'
import type {
  TradeRouteParams,
  TradeSearchParams,
} from '@/components/routes/trade/routing'

import { OpynCharts } from '@/components/routes/trade/charts'
import { TradePositions } from '@/components/routes/trade/positions/index'
import { parseMarketSlug } from '@/lib/opyn'
import { createSupabaseServerClient, getMarketData } from '@/services/supabase'

export default async function TradePage({
  params,
  searchParams,
}: TradePageProps) {
  const { marketSlug, marketType } = params
  const bot = searchParams.bot
  const { marketId, underlierSymbol, numeraireSymbol } =
    parseMarketSlug(marketSlug)
  const supabase = await createSupabaseServerClient()
  const marketMetric = await getMarketData({ marketId, supabase })

  return (
    <TradeDashboard
      nav={<TradeNav marketSlug={marketSlug} marketType={marketType} />}
      health={<TradeAccountHealth />}
      order={
        bot ? (
          <OpynAi />
        ) : (
          <TradeOrder marketSlug={marketSlug} marketType={marketType} />
        )
      }
      market={
        <TradeMarketData
          marketSlug={marketSlug}
          marketType={marketType}
          marketMetric={marketMetric}
        />
      }
      mobileMarket={
        <TradeMarketInfoMobile
          marketSlug={marketSlug}
          marketType={marketType}
          marketMetric={marketMetric}
        />
      }
      chart={
        <OpynCharts
          underlierSymbol={underlierSymbol}
          numeraireSymbol={numeraireSymbol}
        />
      }
      positions={<TradePositions />}
      mobilePositions={<TradePositions key="trading-positions-card" />} // key required on swiper
    />
  )
}

interface TradePageProps {
  params: TradeRouteParams
  searchParams: TradeSearchParams
}
