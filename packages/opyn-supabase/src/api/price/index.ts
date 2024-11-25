import { captureAppError } from '@opyn/errors'
import type { SupaApiParams } from '../types'

export async function getPythPriceFeed({ supabase }: SupaApiParams) {
  const { data, error } = await supabase.from('pyth_price_feed').select('*')

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getChainlinkPriceFeed({ supabase }: SupaApiParams) {
  const { data, error } = await supabase
    .from('chainlink_price_feed')
    .select('*')

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getChainlinkPriceByMarketId({
  marketId,
  supabase,
}: SupaApiParams & {
  marketId: string
}) {
  const { data, error } = await supabase
    .from('chainlink_price_feed')
    .select()
    .eq('market_id', marketId)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getPythPriceByMarketId({
  marketId,
  supabase,
}: SupaApiParams & {
  marketId: string
}) {
  const { data, error } = await supabase
    .from('pyth_price_feed')
    .select()
    .eq('market_id', marketId)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}
