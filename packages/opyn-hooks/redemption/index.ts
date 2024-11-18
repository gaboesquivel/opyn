import { OpynAbis, OpynAddresses } from '@opyn/core'
import { useWriteContract } from 'wagmi'

export function useRedeem() {
  const { writeContract, ...exports } = useWriteContract()

  const redeem = () => {
    writeContract({
      address: OpynAddresses.Redemption,
      abi: OpynAbis.Redemption,
      functionName: 'redeem',
    })
  }

  return { redeem, ...exports }
}
