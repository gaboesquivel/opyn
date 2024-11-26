import { captureAppError } from '@/services/sentry'
import type { MarketType } from '@/types/opyn'
import type { AggregateSortFields, SupaApiParams } from '../types'

// TODO: filter by marketType
export async function getMarkets({
  marketType,
  supabase,
}: SupaApiParams & {
  marketType: MarketType
}) {
  const { data, error } = await supabase.from('market').select(`
      *,
      underlier:token!market_protocol_asset_fkey(*),
      numeraire:token!market_protocol_numeraire_fkey(*)
    `)

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getMarket({
  marketId,
  supabase,
}: SupaApiParams & {
  marketId: string
}) {
  const { data, error } = await supabase
    .from('market')
    .select(`
      *,
      underlier:token!market_protocol_asset_fkey(*),
      numeraire:token!market_protocol_numeraire_fkey(*)
    `)
    .eq('id', marketId)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getMarketData({
  marketId,
  supabase,
}: SupaApiParams & {
  marketId: string
}) {
  const { data, error } = await supabase
    .from('market_metric')
    .select()
    .eq('market_id', marketId)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getAggregatedMarketMetrics({
  sortField = 'total_volume_24h',
  sortDirection = 'DESC',
  supabase,
}: SupaApiParams & {
  sortField: AggregateSortFields
  sortDirection: 'ASC' | 'DESC'
}) {
  const pageLimit = 10
  const pageOffset = 0

  const { data, error } = await supabase.rpc('aggregate_market_metrics', {
    sort_field: sortField,
    sort_direction: sortDirection,
    page_limit: pageLimit,
    page_offset: pageOffset,
  })

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getAllMarketsOverview({ supabase }: SupaApiParams) {
  const { data, error } = await supabase
    .from('market_metric')
    .select(`
      total_volume_24h:volume_24h.sum(),
      total_open_interest:open_interest.sum()
      `)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}
