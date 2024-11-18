'use client'

// import { useTokenBalance } from "@/hooks/evm/use-balance";
// // import { getToken } from '@opyn/tokens'
// // import type { Token } from '@opyn/tokens'
// import { erc20Abi } from "abitype/abis";
// import { useAccount } from "wagmi";

export function TokenBalance() {
  // const { address } = useAccount()
  // const tokenData = getToken({
  //   address: token.address,
  //   symbol: token.symbol,
  //   name: token.name,
  // } as Pick<Token, 'address' | 'symbol' | 'name'>)
  // if (!tokenData) return <div> token not found </div>
  // const balance = useTokenBalance({
  //   token: tokenData,
  //   address,
  //   abi: erc20Abi,
  // })
  // return (
  //   <span
  //     itemProp="amount"
  //     itemScope
  //     itemType="https://schema.org/QuantitativeValue"
  //   >
  //     {balance.formatted} {tokenData.symbol}
  //   </span>
  // )
  return <div>Token Balance</div>
}
