'use client'
import { useEffect } from 'react'
/**
 * Hook to fetch and optionally watch a token balance for an address
 * @param address Optional address to check balance for. Defaults to connected wallet
 * @param assetAddress Token contract address to check balance of
 * @param watch Whether to poll balance every 500ms
 * @returns Balance data and loading state
 */
import { type Address, formatUnits, getAddress } from 'viem'
import { useBalance } from 'wagmi'
import { useAccount } from 'wagmi'

export function useLiveBalance({
  address,
  assetAddress,
  watch=true,
}: {
  address?: Address
  assetAddress: Address
  watch?: boolean
}) {
  const account = useAccount()
  const {
    data: balance,
    refetch,
    ...o
  } = useBalance({
    address: address
      ? getAddress(address || account?.address)
      : account?.address,
    token: getAddress(assetAddress),
  })

  useEffect(() => {
    if (!watch) return
    const interval = setInterval(() => {
      refetch()
    }, 500)

    return () => clearInterval(interval)
  }, [watch, refetch])

  return {
    balance,
    refetch,
    ...o,
  }
}
