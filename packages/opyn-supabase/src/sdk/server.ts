import { appConfig } from '@opyn/lib'
import type { Database } from '@opyn/supabase'
import { createClient } from '@supabase/supabase-js'

export const createSupabaseServerClient = () =>
  createClient<Database>(
    appConfig.supabase.url,
    appConfig.supabase.serviceRoleKey,
  )
