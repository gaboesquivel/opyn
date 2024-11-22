import {
  type Database,
  type Tables,
  type TablesInsert,
  marketInsertSchema,
} from '@opyn/supabase'
import { createClient } from '@supabase/supabase-js'
import { appConfig } from './config'

// Initialize Supabase client
export const supabase = createClient<Database>(
  appConfig.supabase.url,
  appConfig.supabase.serviceRoleKey,
)

/**
 * Inserts a new market record into the database
 * @param market The market data to insert
 * @returns The inserted market record or throws an error
 */
export async function insertMarket({
  market,
}: {
  market: TablesInsert<'market'>
}): Promise<Tables<'market'>> {
  // Validate market data against schema
  const result = marketInsertSchema.safeParse(market)
  if (!result.success) {
    const errors = result.error.errors
      .map((err) => `${err.path}: ${err.message}`)
      .join(', ')
    throw new Error(`Invalid market data: ${errors}`)
  }

  const { data, error } = await supabase
    .from('market')
    .insert(market)
    .select()
    .single()

  if (error) throw new Error(`Failed to insert market: ${error.message}`)
  if (!data) throw new Error('No market data returned after insert')

  return data
}
