import { captureAppError } from '@opyn/errors'
import type { TablesInsert, TablesUpdate } from '../..'
import type { AggregateSortFields, SupaApiParams } from '../types'

// TODO: filter by marketType
export async function getMarkets({
  supabase,
  marketType: _marketType,
}: SupaApiParams & { marketType: string }) {
  const { data, error } = await supabase.from('market').select(`
      *,
      underlier:asset!market_underlier_fkey(*),
      numeraire:asset!market_numeraire_fkey(*)
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
      underlier:asset!market_underlier_fkey(*),
      numeraire:asset!market_numeraire_fkey(*)
    `)
    .eq('id', marketId)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getMarketMetric({
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

// export async function depositMarketCollateral({
//   marketId,
//   amount,
//   hash,
//   supabase,
// }: SupaApiParams & {
//   marketId: string
//   amount: string
//   hash: string
// }) {
//   const { data, error } = await supabase
//     .from('market_collateral')
//     .insert({
//       market_id: marketId,
//       amount,
//       deposit_hash: hash,
//       status: 'pending',
//     })
//     .select()
//     .single()

//   if (error || !data) captureAppError('FETCH_ERROR', error)

//   return data as NonNullable<typeof data>
// }

export async function getMarketPerp({
  marketId,
  supabase,
}: SupaApiParams & {
  marketId: string
}) {
  const { data, error } = await supabase
    .from('market_perp')
    .select()
    .eq('market_id', marketId)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function insertMarket({
  market,
  supabase,
}: SupaApiParams & {
  market: TablesInsert<'market'>
}) {
  const { data, error } = await supabase
    .from('market')
    .insert(market)
    .select()
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getUserMarketCollateral({
  marketId,
  address,
  supabase,
}: SupaApiParams & {
  marketId: string
  address: string
}) {
  const { data, error } = await supabase
    .from('user_market_collateral')
    .select()
    .eq('market_id', marketId)
    .eq('user_address', address)
    .single()

  if (error) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function insertUserMarketCollateral({
  collateral,
  supabase,
}: SupaApiParams & {
  collateral: TablesInsert<'user_market_collateral'>
}) {
  const { data, error } = await supabase
    .from('user_market_collateral')
    .insert(collateral)
    .select()
    .single()

  if (error || !data) captureAppError('INSERT_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function updateUserMarketCollateral({
  collateral,
  supabase,
}: SupaApiParams & {
  collateral: TablesUpdate<'user_market_collateral'>
}) {
  if (!collateral.market_id || !collateral.user_address) return null
  const { data, error } = await supabase
    .from('user_market_collateral')
    .update(collateral)
    .eq('market_id', collateral.market_id)
    .eq('user_address', collateral.user_address)
    .select()
    .single()

  if (error || !data) captureAppError('UPDATE_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getMarketByControllerAddress({
  controllerAddress,
  supabase,
}: SupaApiParams & {
  controllerAddress: string
}) {
  const { data, error } = await supabase
    .from('market')
    .select()
    .eq('controller', controllerAddress)
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
