import { captureAppError } from '@opyn/errors'
import type { SupaApiParams } from '../types'

// TODO: filter by marketType
export async function getMarkets({ supabase }: SupaApiParams) {
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
