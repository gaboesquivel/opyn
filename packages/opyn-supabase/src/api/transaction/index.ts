import { captureAppError } from '@opyn/errors'
import type { SupaApiParams } from '../types'

export async function getAllTransactions({ supabase }: SupaApiParams) {
  const { data, error } = await supabase
    .from('transactions')
    .select()
    .order('created_at', { ascending: false })

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}
