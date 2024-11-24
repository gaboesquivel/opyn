import { opynConfig } from '@opyn/lib'
import type { Database } from '@opyn/supabase'
import { createClient } from '@supabase/supabase-js'

export const createSupabaseServerClient = () =>
  createClient<Database>(
    opynConfig.supabase.url,
    opynConfig.supabase.serviceRoleKey,
  )
