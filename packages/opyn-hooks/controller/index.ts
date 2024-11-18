import { OpynAbis, OpynAddresses } from '@opyn/core'
import { useWriteContract } from 'wagmi'

export function useRedeem() {
  const { writeContract, ...exports } = useWriteContract()

  const execute = () => {
    writeContract({
      address: OpynAddresses.Controller,
      abi: OpynAbis.Controller,
      functionName: 'execute',
    })
  }

  return { execute, ...exports }
}
