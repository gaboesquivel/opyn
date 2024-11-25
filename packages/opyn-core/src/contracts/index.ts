import { getAddress, getContract } from 'viem'
import type { PublicClient } from 'viem'
import { opynAbis } from '../abis'
import type { MarketAddresses, MarketContractName } from '../types'

export function getMarketContracts({
  client,
  marketAddresses,
}: { client: PublicClient; marketAddresses: MarketAddresses }) {
  const contracts = Object.keys(opynAbis).reduce(
    (acc, key) => {
      const address = getAddress(marketAddresses[key as MarketContractName])
      if (!address) {
        console.error(`Address not found for contract: ${key}`)
        return acc
      }

      acc[key] = getContract({
        abi: opynAbis[key as MarketContractName],
        address,
        client,
      })
      return acc
    },
    {} as Record<string, ReturnType<typeof getContract>>,
  )

  return contracts
}
