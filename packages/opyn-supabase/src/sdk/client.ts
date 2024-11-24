'use client'

import { appConfig } from '@opyn/lib'
import type { Database } from '@opyn/supabase'
import { createBrowserClient } from '@supabase/ssr'
import { useMemo } from 'react'

export function getSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    appConfig.supabase.url,
    appConfig.supabase.anonKey,
  )
}

export function useSupabaseClient() {
  return useMemo(getSupabaseBrowserClient, [])
}
