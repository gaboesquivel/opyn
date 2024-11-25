import type { Database, TablesInsert } from '@opyn/supabase'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
export const supabase = createClient<Database>(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
)

export async function insertUserMarketCollateral({
  collateral,
}: {
  collateral: TablesInsert<'user_market_collateral'>
}) {
  const { data, error } = await supabase
    .from('user_market_collateral')
    .insert(collateral)
    .select()
    .single()

  if (error || !data) throw new Error('INSERT_ERROR', { cause: error })

  return data as NonNullable<typeof data>
}

export async function getMarketByControllerAddress({
  controllerAddress,
}: {
  controllerAddress: string
}) {
  const { data, error } = await supabase
    .from('market')
    .select()
    .eq('controller', controllerAddress.toLowerCase())
    .single()

  if (error || !data) throw new Error('FETCH_ERROR', { cause: error })

  return data as NonNullable<typeof data>
}
