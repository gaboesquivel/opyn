import { opynConfig } from '@opyn/lib'
import type { Database } from '@opyn/supabase'
import { createClient } from '@supabase/supabase-js'

// TODO: secure this, use anon key for now
export const createSupabaseServerClient = () => {
  return createClient<Database>(
    opynConfig.supabase.url,
    // opynConfig.supabase.serviceRoleKey,
    opynConfig.supabase.anonKey,
  )
}
