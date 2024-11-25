'use client'

import { opynConfig } from '@opyn/lib'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <div
      className={`${opynConfig.features.ai ? 'sticky' : 'sticky'}  top-0 z-50 flex max-h-[64px] h-[64px] w-full items-center justify-between p-2 bg-background`}
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
      </div>
    </div>
  )
}
