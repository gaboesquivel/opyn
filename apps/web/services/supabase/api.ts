import { createSupabaseServerClient } from '@/services/supabase/server'

export async function getMarket(pair: string) {
  const supabase = await createSupabaseServerClient()
  const { data: market, error } = await supabase
    .from('market')
    .select(`
        *,
        base_token:token!market_base_token_id_fkey(*),
        quote_token:token!market_quote_token_id_fkey(*)
      `)
    .eq('label', pair)
    .single()

  if (error) throw new Error(`Failed to fetch market data: ${error.message}`)
  if (!market) throw new Error(`Market not found for pair: ${pair}`)

  return market
}
