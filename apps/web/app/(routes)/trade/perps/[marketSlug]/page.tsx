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
import { createSupabaseNextClient, getUserMarketEquity } from '@opyn/supabase'
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

  return (
    <TradeDashboard
      nav={<TradeNav />}
      health={<TradeAccountHealth equity={equity} />}
      order={bot ? <OpynAi /> : <TradeOrder />}
      market={<TradeMarketData marketMetric={marketMetric} />}
      mobileMarket={<TradeMarketInfoMobile marketMetric={marketMetric} />}
      chart={
        <OpynCharts
          underlierSymbol={underlierSymbol}
          numeraireSymbol={numeraireSymbol}
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
}
