'use server'

import { type ActionResult, failure, success } from '@/lib/actions'
import { createSupabaseServerClient } from '@/services/supabase'
import type { Tables } from '@opyn/supabase'
import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'

const userSchema = z.object({
  address: z.string(),
  ens: z.string().nullable().optional(),
  notifs: z.boolean().nullable().optional(),
  telegram: z.string().nullable().optional(),
})

export const saveUser = createSafeActionClient()
  .schema(userSchema)
  .action(
    async ({ parsedInput: user }): Promise<ActionResult<Tables<'users'>>> => {
      try {
        const supabase = await createSupabaseServerClient()

        const { data, error } = await supabase
          .from('users')
          .upsert(user, { onConflict: 'address' })
          .select()
          .single()

        if (error) return failure('DB_OP_FAILURE', error)

        if (!data)
          return failure('NO_DATA', new Error('No data returned from insert'))

        return success(data)
      } catch (error) {
        return failure('UNEXPECTED_ERROR', error)
      }
    },
  )
