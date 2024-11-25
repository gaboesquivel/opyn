'use client'

import { type Address, getAddress } from 'viem'

import { erc20Abi } from 'viem'
import { useReadContract } from 'wagmi'

/**
 * Hook to get the total supply of an ERC20 token
 * @param assetAddress The address of the ERC20 token
 * @returns The total supply and other useReadContract properties
 */
export function useSupply({ token }: { token: Address }) {
  const { data: supply, ...o } = useReadContract({
    address: getAddress(token),
    abi: erc20Abi,
    functionName: 'totalSupply',
  })

  return { supply, ...o }
}
