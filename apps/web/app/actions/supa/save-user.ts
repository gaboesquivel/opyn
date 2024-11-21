'use server'

import { type ActionResult, failure, success } from '@/lib/actions'
import { createSupabaseServerClient } from '@/services/supabase'
import { type Tables, userInsertSchema } from '@opyn/supabase'
import { createSafeActionClient } from 'next-safe-action'

// Saves or updates a user record in the database
export const saveUser = createSafeActionClient()
  .schema(userInsertSchema)
  .action(
    async ({ parsedInput: user }): Promise<ActionResult<Tables<'user'>>> => {
      try {
        const supabase = await createSupabaseServerClient()

        const { data, error } = await supabase
          .from('user')
          .upsert(user, { onConflict: 'id' })
          .select()
          .single()

        if (error) return failure('DB_OP_FAILURE', error)

        if (!data)
          return failure('DB_OP_FAILURE', new Error('No data returned'))

        return success(data)
      } catch (error) {
        return failure('UNEXPECTED_ERROR', error)
      }
    },
  )
