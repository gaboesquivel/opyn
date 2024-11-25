'use client'

import { Button } from '@/components/ui/button'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Suspense } from 'react'

// Connect button 'use client' wrapper
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-third-party-packages-and-providers
export function OpynConnectButton() {
  return (
    <Suspense fallback={<Button>Connect Wallet</Button>}>
      <ConnectButton
        showBalance={false}
        chainStatus="icon"
        accountStatus="address"
      />
    </Suspense>
  )
}
