/**
 * Application configuration object containing environment variables and feature flags.
 */

export const opynConfig = {
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'VITE_SUPABASE_URL'),
    anonKey: getEnvVar(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'VITE_SUPABASE_ANON_KEY',
    ),
    serviceRoleKey: getEnvVar(
      'SUPABASE_SERVICE_ROLE_KEY',
      'VITE_SUPABASE_SERVICE_ROLE_KEY',
    ),
  },
  alchemy: {
    notifyToken: getEnvVar('ALCHEMY_NOTIFY_TOKEN', 'VITE_ALCHEMY_NOTIFY_TOKEN'),
  },
  services: {
    googleAnalyticsId: getEnvVar(
      'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID',
      'VITE_GOOGLE_ANALYTICS_ID',
    ),
    sentryDsn: getEnvVar('NEXT_PUBLIC_SENTRY_DSN', 'VITE_SENTRY_DSN'),
    sentryAuthToken: getEnvVar('SENTRY_AUTH_TOKEN', 'VITE_SENTRY_AUTH_TOKEN'),
  },
  // feature flags
  features: {
    ai: getEnvVar('NEXT_PUBLIC_AI', 'VITE_AI') === 'true', // Fullscreen AI only experience
    aiAssistant:
      getEnvVar('NEXT_PUBLIC_AI_ASSISTANT', 'VITE_AI_ASSISTANT') === 'true', // AI Assistant in sidebar
  },
} as const

function getEnvVar(nextVar: string, viteVar: string, defaultValue = '') {
  if (typeof process !== 'undefined')
    return process.env[nextVar] || defaultValue
  if (typeof import.meta !== 'undefined')
    return import.meta.env[viteVar] || defaultValue
  return defaultValue
}
