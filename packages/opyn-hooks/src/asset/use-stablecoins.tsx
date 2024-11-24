import { getStablecoins } from '@opyn/supabase'
import { useSupabaseClient } from '@opyn/supabase'
import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'viem'

/**
 * Hook to fetch stablecoins from the database
 * @returns Query result containing stablecoins data
 */
export function useStablecoins() {
  const supabase = useSupabaseClient()

  const { data: stablecoins, ...o } = useQuery({
    queryKey: ['stablecoins'],
    queryFn: () => getStablecoins({ supabase }),
  })

  return {
    stablecoins: stablecoins?.map((stablecoin) => ({
      ...stablecoin,
      address: getAddress(stablecoin.address),
    })),
    ...o,
  }
}
