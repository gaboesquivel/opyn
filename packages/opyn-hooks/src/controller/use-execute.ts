'use client'

import { opynAbis } from '@opyn/core'
import type { Address } from 'viem'
import { useWriteContract } from 'wagmi'

export function useExecute(address: Address) {
  const { writeContract, ...exports } = useWriteContract()

  const execute = (args: unknown[]) => {
    writeContract({
      address,
      abi: opynAbis.Controller,
      functionName: 'execute',
      args,
    })
  }

  return { execute, ...exports }
}
