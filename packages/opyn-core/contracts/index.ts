import { getContract } from 'viem'
import type { Address, PublicClient } from 'viem'
import { OpynAbis } from '../abis'
import type { OpynContractName } from '../types'

// Map of contract names to their respective addresses
export const OpynAddresses: Record<OpynContractName, Address> = {
  Controller: '0x',
  Factory: '0x',
  Feeder: '0x',
  Redemption: '0x',
  Shutdown: '0x',
}

export function getOpynContracts({ client }: { client: PublicClient }) {
  const contracts = Object.keys(OpynAbis).reduce(
    (acc, key) => {
      const address = OpynAddresses[key]
      if (!address) {
        console.error(`Address not found for contract: ${key}`)
        return acc
      }

      acc[key] = getContract({
        abi: OpynAbis[key],
        address,
        client,
      })
      return acc
    },
    {} as Record<string, ReturnType<typeof getContract>>,
  )

  return contracts
}
