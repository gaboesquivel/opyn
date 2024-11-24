'use client'

import { opynRainbowKitTheme } from '@opyn/ui'
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import type { Theme as RainbowKitTheme } from '@rainbow-me/rainbowkit'
import {
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { merge } from 'lodash'
import { WagmiProvider } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'

const queryClient = new QueryClient()

export const wagmiConfig = getDefaultConfig({
  appName: 'opyn',
  projectId: '325f49a9abd5fdea19e55bd58449c7dc',
  wallets: [
    {
      groupName: 'Popular',
      wallets: [metaMaskWallet, trustWallet, walletConnectWallet],
    },
  ],
  chains: [arbitrumSepolia],
})

const customRainbowKitTheme: RainbowKitTheme = merge(
  darkTheme(),
  opynRainbowKitTheme,
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider
          theme={customRainbowKitTheme}
          modalSize="compact"
          showRecentTransactions={true}
          appInfo={{
            appName: 'Opyn',
          }}
        >
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
