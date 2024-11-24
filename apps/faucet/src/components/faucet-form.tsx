import { type Tables, getStablecoins, useSupabaseClient } from '@opyn/supabase'
import { Button, Input, Label } from '@opyn/ui'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getAddress, parseUnits } from 'viem'
import { sepolia } from 'viem/chains'
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi'
import TestnetToken from '../abis/TestnetToken.json'
import { AddTokenToWallet } from './add-token-to-metamask'
import { TokenSelect } from './token-select'

export function FaucetForm() {
  const supabase = useSupabaseClient()
  const { data: tokens = [] } = useQuery({
    queryKey: ['stablecoins'],
    queryFn: () => getStablecoins({ supabase }),
  })
  const account = useAccount()
  const [address, setAddress] = useState<string | undefined>(
    account?.address ? account.address : undefined,
  )
  const [quantity, setQuantity] = useState<string>('100')
  const { writeContract, isPending, isSuccess, data, ...other } =
    useWriteContract()
  const [token, setToken] = useState<Tables<'asset'> | undefined>(tokens?.[0])
  const { switchChain } = useSwitchChain()

  // Execute the contract write operation
  const callFaucet = async () => {
    if (!token) return
    switchChain({ chainId: sepolia.id })

    console.log(
      'callFaucet',
      JSON.stringify({
        ...token,
        functionName: 'faucet',
        args: [address, parseUnits(quantity, token.decimals).toString()],
        chainId: sepolia.id,
      }),
    )
    writeContract({
      address: getAddress(token.address),
      abi: TestnetToken.abi,
      functionName: 'faucet',
      args: [address, parseUnits(quantity, token.decimals)],
      chainId: sepolia.id,
    })
  }
  console.log({ data, ...other })

  // update input when user changes address on wallet
  useEffect(() => {
    if (account.address !== address) setAddress(account.address)
  }, [account, address])

  return (
    <div className="flex flex-col w-full max-w-[1.5*md] items-start gap-4">
      <div className="flex items-center w-full gap-4">
        <Label className="w-1/3 mr-2 text-right" htmlFor="quantity">
          Quantity
        </Label>
        <Input
          className="w-[225px]"
          id="quantity"
          max="1000"
          min="1"
          placeholder="Enter quantity"
          type="number"
          step="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TokenSelect
          tokens={tokens}
          defaultValue={'0'}
          onValueChange={(i) => setToken(tokens[Number.parseInt(i)])}
        />
      </div>
      <div className="flex items-center w-full gap-4">
        <Label className="w-1/3 mr-2 text-right" htmlFor="address">
          Address
        </Label>
        <Input
          className="w-[500px]"
          id="address"
          placeholder="Enter address"
          type="text"
          value={address || ''}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="flex justify-center w-full gap-5 pt-2">
        <Button
          className="w-1/4"
          type="submit"
          disabled={isPending}
          onClick={callFaucet}
        >
          Submit
        </Button>
        {token && <AddTokenToWallet {...token} />}
      </div>

      <div className="flex justify-center w-full">
        <code>{JSON.stringify({ isPending, isSuccess, data })}</code>
      </div>
    </div>
  )
}
