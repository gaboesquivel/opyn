import { Button } from '@/components/ui/button'
import { appConfig } from '@/lib/config'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { Menu } from './menu'

export function Header() {
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
          <Suspense fallback={<Button>Login</Button>}>
            <ConnectButton
              showBalance={false}
              chainStatus="icon"
              accountStatus="address"
            />
          </Suspense>
        </div>
        <div className="flex lg:hidden">
          {/* DynamicMobileNav component removed */}
        </div>
      </div>
    </div>
  )
}
