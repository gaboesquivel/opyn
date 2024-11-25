import type { Database } from '@opyn/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

export interface SupaApiParams {
  supabase: SupabaseClient<Database>
}
