'use server'

import { type ActionResult, failure, success } from '@opyn/lib'
import { createSupabaseNextClient } from '@opyn/supabase'
import { upsertUserAddress } from '@opyn/supabase/src/api/user'
import { createSafeActionClient } from 'next-safe-action'
import { cookies } from 'next/headers'
import { z } from 'zod'

const schema = z.object({
  address: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address')
    .transform((addr) => (addr ? addr.toLowerCase() : ''))
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

        const supabase = await createSupabaseNextClient()
        await upsertUserAddress({ address, supabase })

        cookies().set('address', address, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 24 * 60 * 60, // 24 hours
        })

        return success({ address })
      } catch (error) {
        return failure('SERVER_ERROR', error)
      }
    },
  )

interface AddressCookieResponse {
  address: string
}
