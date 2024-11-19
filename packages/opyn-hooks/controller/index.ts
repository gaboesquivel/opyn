import { OpynAbis, OpynAddresses } from '@opyn/core'
import { useWriteContract } from 'wagmi'

export function useExecute() {
  const { writeContract, ...exports } = useWriteContract()

  const execute = (args: unknown[]) => {
    writeContract({
      address: OpynAddresses.Controller,
      abi: OpynAbis.Controller,
      functionName: 'execute',
      args,
    })
  }

  return { execute, ...exports }
}
