import type { Tables } from '@opyn/supabase'
import { Button } from '@opyn/ui'
import { sepolia } from 'viem/chains'
import { useSwitchChain } from 'wagmi'

export function AddTokenToWallet({
  address,
  symbol,
  decimals,
  image,
  name,
  chainId = sepolia.id,
}: Tables<'asset'> & {
  chainId?: number
  image?: string
}) {
  const { switchChain } = useSwitchChain()
  // console.log({ address, symbol, decimals, image, name })
  const addTokenToMetaMask = async () => {
    try {
      if (!window.ethereum && !window.ethereum.isMetaMask)
        alert('MetaMask is not installed')
      if (chainId) await switchChain({ chainId })
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals,
            image,
          },
        },
      })
      alert('Token added to MetaMask')
    } catch (error) {
      console.error('Error adding token to MetaMask', error)
      alert('Error adding token to MetaMask')
    }
  }

  return (
    <Button variant="outline" onClick={addTokenToMetaMask}>
      Add {name} to MetaMask
    </Button>
  )
}

interface CustomWindow extends Window {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  ethereum?: any
}

declare let window: CustomWindow
