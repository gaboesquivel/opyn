if (!process.env.NEXT_PUBLIC_SUPABASE_URL)
  throw new Error('NEXT_PUBLIC_SUPABASE_URL environment variable is required')
if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
  throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is required')

export const appConfig = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
} as const
