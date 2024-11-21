import { captureAppError } from '@/services/sentry'
import type { MarketType } from '@/types/opyn'
import type { SupaApiParams } from '../types'

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
