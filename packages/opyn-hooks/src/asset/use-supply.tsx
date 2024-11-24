'use client'

import { useEffect } from 'react'
import { type Address, getAddress } from 'viem'

import { erc20Abi } from 'viem'
import { useReadContract } from 'wagmi'

/**
 * Hook to get the total supply of an ERC20 token
 * @param assetAddress The address of the ERC20 token
 * @returns The total supply and other useReadContract properties
 */
export function useSupply({
  assetAddress,
  watch,
}: { assetAddress: Address; watch?: boolean }) {
  const {
    data: supply,
    refetch,
    ...o
  } = useReadContract({
    address: getAddress(assetAddress),
    abi: erc20Abi,
    functionName: 'totalSupply',
  })

  useEffect(() => {
    if (!watch) return
    const timeout = setTimeout(() => refetch(), 5000)

    return () => clearTimeout(timeout)
  }, [refetch, watch])

  return { supply, ...o }
}
