'use client'

import { setAddressCookie } from '@/app/actions/ui/address-cookie'
import { OpynConnectButton } from '@/components/layout/header/connect'

import { appConfig } from '@/lib/config'
import { useAction } from 'next-safe-action/hooks'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Menu } from './menu'

export function Header() {
  const { execute } = useAction(setAddressCookie)
  const { address } = useAccount()

  // Set the user's address in a cookie for server-side access
  // keeps them in sync with the wallet client
  useEffect(() => {
    address ? execute({ address }) : execute({ address: '' })
  }, [address, execute])

  return (
    <div
      className={`${appConfig.features.ai ? 'sticky' : 'sticky'}  top-0 z-50 flex max-h-[64px] h-[64px] w-full items-center justify-between p-2 bg-background`}
    >
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/images/opyn-logo.png"
            alt="Opyn"
            width={132}
            height={40}
          />
        </Link>

        {!appConfig.features.ai ? (
          <div className="hidden md:flex md:gap-3 md:pl-4 lg:ml-[-1px] lg:gap-10">
            <Menu />
          </div>
        ) : null}
      </div>

      <div className="flex justify-end lg:min-w-[300px] lg:gap-5">
        <div className="items-center gap-5 flex">
          <OpynConnectButton />
        </div>
        <div className="flex lg:hidden">
          {/* DynamicMobileNav component removed */}
        </div>
      </div>
    </div>
  )
}
