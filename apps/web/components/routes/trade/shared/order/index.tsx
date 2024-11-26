'use client'

import { useMarket, useMint } from '@opyn/hooks'
import { opynConfig } from '@opyn/lib'
import type { Tables } from '@opyn/supabase'
import type { TradeSide } from '@opyn/types'
import { QuantityInput } from '@opyn/ui'
import { TrendDownIcon, TrendUpIcon } from '@opyn/ui'
import { CurrencyIcon } from '@opyn/ui'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@opyn/ui'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getAddress } from 'viem'
import { useAccount } from 'wagmi'
import { OrderDetails } from './details'
import { PerpTypeButtons } from './perp-type'
import { LeverageSlider } from './slider'
import { OrderToast } from './toast'

const getMintState = (mint: ReturnType<typeof useMint>) => ({
  isPending: mint.isPending,
  isSuccess: mint.isSuccess,
  isError: mint.isError,
  error: mint.error,
  reset: mint.reset,
})

export function TradeOrder({ market }: { market: Tables<'market'> }) {
  const [quantity, setQuantity] = useState<string>('1000')
  const mintShort = useMint({
    tokenAddress: market.two_perp_short
      ? getAddress(market.two_perp_short)
      : '0x',
    amount: BigInt(quantity),
  })
  const mintLong = useMint({
    tokenAddress: market.two_perp_long
      ? getAddress(market.two_perp_long)
      : '0x',
    amount: BigInt(quantity),
  })

  const [_, setDialog] = useQueryState('dialog')

  const [side, setSide] = useQueryState<TradeSide>('side', {
    defaultValue: 'long',
    clearOnDefault: true,
    parse: (value) => value as TradeSide,
  })

  const [leverage] = useQueryState<number>('lev', {
    parse: (value) => Number.parseFloat(value),
  })

  const executeOrder = () => {
    if (side === 'long') {
      mintLong.mint()
    } else {
      mintShort.mint()
    }
  }

  // User notifications
  useEffect(() => {
    const mint = side === 'long' ? mintLong : mintShort
    const mintState = getMintState(mint)

    if (mintState.isPending) {
      toast.custom((t) => <OrderToast size={quantity} status="loading" />, {
        id: 'order-execution',
        duration: Number.POSITIVE_INFINITY,
      })
    } else if (mintState.isSuccess) {
      toast.custom((t) => <OrderToast size={quantity} status="success" />, {
        id: 'order-execution',
        duration: 5000,
      })
      setTimeout(() => mintState.reset(), 5000)
    } else if (mintState.isError && mintState.error) {
      toast.custom(
        (t) => (
          <OrderToast
            size={quantity}
            status="error"
            errorMessage={mintState.error?.message || 'Transaction failed'}
          />
        ),
        { id: 'order-execution', duration: 5000 },
      )
      setTimeout(() => mintState.reset(), 5000)
    }
  }, [side, quantity, mintLong, mintShort])

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { underlierSymbol } = useMarket()
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()

  return (
    <Card variant="padded">
      <div className=" min-w-[270px] ">
        <div className="flex gap-1 mb-4 gap-2 justify-evenly">
          <Button
            className="flex-1 h-[44px]"
            variant={side === 'long' ? 'up' : 'inactive'}
            onClick={() => setSide('long')}
          >
            <TrendUpIcon /> <span className="ml-2">Long</span>
          </Button>
          <Button
            className="flex-1 h-[44px]"
            variant={side === 'short' ? 'down' : 'inactive'}
            onClick={() => setSide('short')}
          >
            <TrendDownIcon /> <span className="ml-2">Short</span>
          </Button>
        </div>

        <div className="hidden sm:block">
          <PerpTypeButtons />
        </div>

        <p className="w-full text-sm m-4 justify-center flex gap-4">
          <span
            className="border-b border-current cursor-pointer"
            onClick={() => setDialog('compare')}
          >
            Compare Perps
          </span>

          {opynConfig.features.aiAssistant && (
            <Link
              href={{
                pathname,
                query: {
                  ...Object.fromEntries(searchParams.entries()),
                  bot: 'opyn',
                },
              }}
              className=" hidden sm:block border-b border-current text-brand cursor-pointer"
            >
              OpynAI
            </Link>
          )}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm">
            Long <span className="text-neutral-light">$4,984.81</span>
          </span>
          <SettingsIcon className="h-5 w-5 " />
        </div>

        <QuantityInput
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          deco={<CurrencyIcon currency={underlierSymbol} />}
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-sm mt-4">
              Asset Leverage
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">
                Leverage is tied to an individual asset within a market
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <LeverageSlider />

        <div className="hidden sm:block">
          <OrderDetails />
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full text-neutral-light text-xs"
        >
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="hover:no-underline">
              Payoff Index
            </AccordionTrigger>
            <AccordionContent className="text-xs">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          variant="positve"
          className="w-full mb-4"
          onClick={address ? executeOrder : openConnectModal}
          // disabled={address ? isPending || quantity === '0' : false}
        >
          {address ? 'Place order' : 'Connect Wallet'}
        </Button>

        <div className="text-center text-xs text-neutral-light">
          Buying power: $167,310.63
        </div>
      </div>
    </Card>
  )
}
