import type { opynErrors } from './catalog'

export interface OpynError {
  code: string
  message: string
}

/**
 * Represents the possible error codes defined in the opynErrors object.
 * This type ensures type safety when working with error codes.
 */
export type OpynErrorCode = keyof typeof opynErrors

// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
export type ErrorWithMessage = {
  message: string
}
