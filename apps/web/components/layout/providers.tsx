'use client'

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
import type { ThemeProviderProps } from 'next-themes/dist/types'
import { WagmiProvider } from 'wagmi'
import { arbitrum, arbitrumSepolia } from 'wagmi/chains'

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
  chains: [arbitrum, arbitrumSepolia],
})

const customRainbowKitTheme: RainbowKitTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#27292B',
    accentColorForeground: '#fff',
    connectButtonBackground: '#27292B',
    connectButtonText: '#FFFFFF',
  },
  radii: {
    actionButton: '9999px',
    connectButton: '9999px',
  },
} as RainbowKitTheme)

export function Providers({ children }: ThemeProviderProps) {
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
