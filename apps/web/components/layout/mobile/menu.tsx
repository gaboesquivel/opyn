'use client'

import { cn } from '@opyn/ui'
import { MarketsIcon, PortfolioIcon, TradeIcon, VaultsIcon } from '@opyn/ui'
import { Bot } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function MobileMenu() {
  const pathname = usePathname()
  const [isTradeMenuOpen, setIsTradeMenuOpen] = useState(false)

  function isActive(href: string) {
    if (href === '/') {
      return pathname.includes('/t')
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sm:hidden flex justify-around items-center w-full relative">
      {navOptions.map((option) =>
        option.text === 'Trade' ? (
          <div key={option.text} className="relative">
            <button
              onClick={() => setIsTradeMenuOpen(!isTradeMenuOpen)}
              className={cn('flex flex-col items-center p-2 space-y-1')}
            >
              <div
                className={cn(
                  'w-6 h-6',
                  isActive(option.href) ? 'text-white' : 'text-neutral-light',
                )}
              >
                <option.icon isActive={isActive(option.href)} />
              </div>
              <span className="text-xs text-neutral-light">{option.text}</span>
            </button>
            {isTradeMenuOpen && (
              <div className="absolute bottom-full py-2 left-0 mb-2 bg-background  rounded-md shadow-lg z-50 flex flex-col justify-around">
                {tradeSubOptions.map((subOption) => (
                  <Link
                    key={subOption.text}
                    href={`${subOption.href}/ETH-USDC-0x1`}
                    className="block px-4 w-[100px] h-10 py-2 pl-6 text-sm text-neutral-light hover:bg-accent"
                    onClick={() => setIsTradeMenuOpen(false)}
                  >
                    {subOption.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={option.text}
            href={option.href}
            className={cn('flex flex-col items-center p-2 space-y-1')}
          >
            <div
              className={cn(
                'w-6 h-6',
                isActive(option.href) ? 'text-white' : 'text-neutral-light',
              )}
            >
              {
                // hotfix for prop issue with bot icon
                option.href === '/ai' ? (
                  <Bot />
                ) : (
                  <option.icon isActive={isActive(option.href)} />
                )
              }
            </div>
            <span className="text-xs text-neutral-light">{option.text}</span>
          </Link>
        ),
      )}
    </nav>
  )
}

const navOptions = [
  { text: 'Trade', href: '/', icon: TradeIcon },
  { text: 'Markets', href: '/markets', icon: MarketsIcon },
  { text: 'Vaults', href: '/vaults', icon: VaultsIcon },
  { text: 'Portfolio', href: '/portfolio', icon: PortfolioIcon },
  { text: 'OpynAI', href: '/ai', icon: Bot },
]

const tradeSubOptions = [
  { text: 'Perps', href: '/trade/perps' },
  { text: 'Spot', href: '/trade/spot' },
  { text: 'Vaults', href: '/trade/vaults' },
]
