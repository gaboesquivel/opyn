'use server'

import { type ActionResult, failure, success } from '@/lib/actions'
import { createSupabaseServerClient } from '@/services/supabase'
import { type Tables, marketInsertSchema } from '@opyn/supabase'
import { createSafeActionClient } from 'next-safe-action'

// Creates a new market in the database
export const addMarket = createSafeActionClient()
  .schema(marketInsertSchema)
  .action(
    async ({
      parsedInput: market,
    }): Promise<ActionResult<Tables<'market'>>> => {
      try {
        const supabase = await createSupabaseServerClient()

        const { data, error } = await supabase
          .from('market')
          .insert(market)
          .select()
          .single()

        if (error) return failure('DB_OP_FAILURE', error)

        return success(data)
      } catch (error) {
        return failure('UNEXPECTED_ERROR', error)
      }
    },
  )