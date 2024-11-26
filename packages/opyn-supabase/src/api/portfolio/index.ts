import { captureAppError } from '@opyn/errors'
import type { Address } from 'viem'
import { getUserMarketCollateral } from '../market'
import type { SupaApiParams } from '../types'

export async function getPortfolioHealth({
  marketId,
  userAddress,
  supabase,
}: SupaApiParams & {
  marketId: string
  userAddress: Address
}) {
  const { data, error } = await supabase
    .from('portfolio_health')
    .select()
    .eq('market_id', marketId)
    .eq('user_address', userAddress)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getUserMarketEquity({
  marketId,
  address,
  supabase,
}: SupaApiParams & {
  marketId: string
  address: Address
}) {
  const collateral = await getUserMarketCollateral({
    marketId,
    address,
    supabase,
  })

  return collateral?.balance
}
