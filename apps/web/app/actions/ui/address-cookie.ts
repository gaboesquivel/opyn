'use server'

import { type ActionResult, failure, success } from '@/lib/actions'
import { createSafeActionClient } from 'next-safe-action'
import { cookies } from 'next/headers'
import { z } from 'zod'

const schema = z.object({
  address: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address')
    .or(z.literal('')),
})

export const setAddressCookie = createSafeActionClient()
  .schema(schema)
  .action(
    async ({
      parsedInput: { address },
    }): Promise<ActionResult<AddressCookieResponse>> => {
      try {
        if (!address) {
          cookies().delete('address')
          return success({ address: '' })
        }

        cookies().set('address', address, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 24 * 60 * 60, // 24 hours
        })

        return success({ address })
      } catch (error) {
        return failure('COOKIE_SET_FAILURE', error)
      }
    },
  )

interface AddressCookieResponse {
  address: string
}
