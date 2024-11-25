import type { Database } from '@opyn/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface SupaApiParams {
  supabase: SupabaseClient<Database>
}

export type AggregateSortFields = "num_markets" | "total_liquidity" | "total_volume_24h" | "total_volume_7d" | "total_volume_30d" | "total_open_interest" | "total_num_traders" | "total_fees_collected"