import { OpynAbis, OpynAddresses } from '@opyn/core'
import { useWriteContract } from 'wagmi'

export function useRedeem() {
  const { writeContract, ...exports } = useWriteContract()

  const redeem = (args: unknown[]) => {
    writeContract({
      address: OpynAddresses.Redemption,
      abi: OpynAbis.Redemption,
      functionName: 'redeem',
      args,
    })
  }

  return { redeem, ...exports }
}
