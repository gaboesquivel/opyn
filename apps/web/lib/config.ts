/**
 * Application configuration object containing environment variables and feature flags.
 */
export const appConfig = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  alchemy: {
    notifyToken: process.env.ALCHEMY_NOTIFY_TOKEN || '',
  },
  services: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    sentryAuthToken: process.env.SENTRY_AUTH_TOKEN || '',
  },
  // feature flags
  features: {
    ai: process.env.NEXT_PUBLIC_AI === 'true', // Fullscreen AI only experience
    aiAssistant: process.env.NEXT_PUBLIC_AI_ASSISTANT === 'true', // AI Assistant in sidebar
  },
} as const
