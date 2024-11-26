import { captureAppError } from '@opyn/errors'
import { createSupabaseNextClient } from '@opyn/supabase'
import type { SupaApiParams } from '../types'

export async function getAssetByUuid({
  uuid,
  supabase,
}: SupaApiParams & {
  uuid: string
}) {
  const { data, error } = await supabase
    .from('asset')
    .select()
    .eq('uuid', uuid)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getStablecoins({ supabase }: SupaApiParams) {
  const { data, error } = await supabase
    .from('asset')
    .select()
    .eq('stablecoin', true)

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}

export async function getAssetByAddress(address: string) {
  const supabase = await createSupabaseNextClient()

  const { data, error } = await supabase
    .from('asset')
    .select()
    .eq('address', address)
    .single()

  if (error || !data) captureAppError('FETCH_ERROR', error)

  return data as NonNullable<typeof data>
}
