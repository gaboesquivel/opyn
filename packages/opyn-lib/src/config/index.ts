/**
 * Application configuration object containing environment variables and feature flags.
 */

export const opynConfig = {
  supabase: {
    url: 'https://iyzpghlzpofnklzeeiws.supabase.co',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5enBnaGx6cG9mbmtsemVlaXdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwNTg1NDAsImV4cCI6MjA0MzYzNDU0MH0.9kJK9yavUZggDSKowRX0PhnhvNWsK_aMszztEP-klmM',
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
