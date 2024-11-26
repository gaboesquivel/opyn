'use client'

import { getAssetByAddress } from '@opyn/supabase'
import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'viem/utils'

/**
 * Hook to fetch asset data by address
 * @param address - The asset address to fetch data for
 * @returns Asset data and query metadata
 */
export function useAsset({
  address,
  enabled = true,
}: { address: string; enabled?: boolean }) {
  const { data, ...o } = useQuery({
    queryKey: ['asset', address],
    queryFn: () => getAssetByAddress(address),
    enabled: enabled && !!address,
  })
  return { asset: { address: getAddress(address), ...data }, ...o }
}
