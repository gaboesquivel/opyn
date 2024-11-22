import { useEffect } from 'react'
import { erc20Abi, formatUnits } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export function useUsdtBalance() {
  const { address } = useAccount()

  const { data, refetch } = useReadContract({
    abi: erc20Abi,
    address: '0x6748f50f642bb567ad4d404243e0fe4ba5213e7e',
    functionName: 'balanceOf',
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    args: [address!],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 5000)

    return () => clearInterval(interval)
  }, [refetch])

  // Convert the balance from wei to ether (adjust decimal places if needed)
  const balance = formatUnits(toBigInt(data), 6)

  return balance
}

function toBigInt(value: unknown): bigint {
  return typeof value === 'bigint' ? value : BigInt(0)
}
