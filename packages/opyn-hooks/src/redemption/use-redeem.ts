import { opynAbis } from '@opyn/core'
import type { Address } from 'viem'
import { useWriteContract } from 'wagmi'

export function useRedeem(address: Address) {
  const { writeContract, ...exports } = useWriteContract()

  const redeem = (args: unknown[]) => {
    writeContract({
      address,
      abi: opynAbis.Redemption,
      functionName: 'redeem',
      args,
    })
  }

  return { redeem, ...exports }
}
