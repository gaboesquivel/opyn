import { TradeAccountHealth } from '@/components/routes/trade/perps/health'
import {
  TradeMarketData,
  TradeMarketInfoMobile,
} from '@/components/routes/trade/perps/market'
import { TradeDashboard } from '@/components/routes/trade/shared/dashboard'
import { TradeNav } from '@/components/routes/trade/shared/nav'
import { TradeOrder } from '@/components/routes/trade/shared/order'
import { OpynAi } from '@opyn/ai'

import { OpynCharts } from '@/components/routes/trade/perps/charts'
import {
  TradePositions,
  TradingPositionsCard,
} from '@/components/routes/trade/perps/positions'
import { parseMarketSlug } from '@opyn/lib'
import {
  createSupabaseNextClient,
  getMarket,
  getUserMarketEquity,
} from '@opyn/supabase'
import { getMarketMetric } from '@opyn/supabase'
import type { AIBot, PerpType, PosTab, TradeSide } from '@opyn/types'
import { cookies } from 'next/headers'
import type { Address } from 'viem'

export default async function TradePage({
  params,
  searchParams,
}: TradePageProps) {
  const marketSlug = params.marketSlug
  const bot = searchParams.bot
  const { marketId, underlierSymbol, numeraireSymbol } =
    parseMarketSlug(marketSlug)
  const supabase = await createSupabaseNextClient()
  const marketMetric = await getMarketMetric({ marketId, supabase })
  const cookieStore = cookies()
  const address = cookieStore.get('address')?.value as Address
  const equity = address
    ? await getUserMarketEquity({ marketId, address, supabase })
    : 0
  const market = await getMarket({ marketId, supabase })
  const mockData = Array.from({ length: 30 }, (_, i) => ({
    timestamp: Date.now() - i * 24 * 60 * 60 * 1000,
    rate: (Math.random() - 0.5) * 0.01, // Random rate between -0.5% and 0.5%
  })).reverse()
  const chartType = searchParams.chart || 'price'

  return (
    <TradeDashboard
      nav={<TradeNav />}
      health={<TradeAccountHealth equity={equity} />}
      order={bot ? <OpynAi /> : <TradeOrder />}
      market={<TradeMarketData marketMetric={marketMetric} />}
      mobileMarket={<TradeMarketInfoMobile marketMetric={marketMetric} />}
      chart={
        <OpynCharts
          data={mockData}
          underlierSymbol={underlierSymbol}
          numeraireSymbol={numeraireSymbol}
          chartType={chartType}
        />
      }
      positions={<TradePositions />}
      mobilePositions={<TradingPositionsCard />}
    />
  )
}

interface TradePageProps {
  params: TradeRouteParams
  searchParams: TradeSearchParams
}

export type TradeRouteParams = {
  marketSlug: string
}

export type TradeSearchParams = {
  perp?: PerpType
  side?: TradeSide
  bot?: AIBot
  postab?: PosTab
  lev: number
  chart?: 'price' | 'funding' | 'payoff'
}
