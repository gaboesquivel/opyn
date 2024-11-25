import { captureAppError } from '@opyn/errors'
import type { SupaApiParams } from '../types'

export async function upsertUserAddress({
  address,
  supabase,
}: SupaApiParams & {
  address: string
}) {
  const { data, error } = await supabase
    .from('user')
    .upsert({ address })
    .select()
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}
