import { captureAppError } from '@opyn/errors'
import type { TablesInsert } from '../..'
import type { SupaApiParams } from '../types'

// TODO: filter by marketType
export async function getMarkets({
  supabase,
  marketType,
}: SupaApiParams & { marketType: string }) {
  console.log('getMarkets', marketType)
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
