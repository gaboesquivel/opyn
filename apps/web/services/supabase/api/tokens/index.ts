import { captureAppError } from '@/services/sentry/index'
import type { SupaApiParams } from '../types'

export async function getTokenByUuid({
  uuid,
  supabase,
}: SupaApiParams & {
  uuid: string
}) {
  const { data, error } = await supabase
    .from('token')
    .select()
    .eq('uuid', uuid)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}
