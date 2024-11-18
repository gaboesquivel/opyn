import { appConfig } from '@/lib/config'
import { type OpynError, type OpynErrorCode, opynErrors } from '@opyn/errors'
import * as Sentry from '@sentry/nextjs'

// Initialize Sentry with configuration
export function initializeSentry() {
  Sentry.init({
    dsn: appConfig.services.sentryDsn,
    tracesSampleRate: 1.0,
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || 'development',
  })
}

// Logs an application error, reports to Sentry and throws an OpynError from catalog for UI to display
export function logOpynErr(code: OpynErrorCode, error: unknown) {
  console.error(`${code}: ${JSON.stringify(error)}`)
  // TODO: review this line later when testing with Sentry
  sentryCaptureException(
    error instanceof Error ? error : new Error(JSON.stringify(error)),
  )
  return opynErrors[code]
}

// Capture and log exceptions with appropriate tags
export function sentryCaptureException(error: OpynError | Error) {
  if ('code' in error && typeof error.code === 'string') {
    // For OpynError, use its code as a tag
    Sentry.captureException(error, { tags: { code: error.code } })
  } else {
    // For other errors, use a generic SYSTEM_ERROR tag
    Sentry.captureException(error, { tags: { code: 'SYSTEM_ERROR' } })
  }
}
