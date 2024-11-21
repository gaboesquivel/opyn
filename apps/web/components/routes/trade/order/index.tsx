'use client'

import { TrendDownIcon, TrendUpIcon } from '@/components/shared/icons'
import { CurrencyIcon } from '@/components/shared/icons'
import { AccordionContent } from '@/components/ui/accordion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { QuantityInput } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { appConfig } from '@/lib/config'
import type { TradeSide } from '@/types/opyn'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSignMessage } from 'wagmi'
import { useAccount } from 'wagmi'
import { useTradeData } from '../hooks/use-trade-data'
import { useTradeRoute } from '../hooks/use-trade-route'
import type { TradeRouteParams } from '../routing'
import { OrderDetails } from './details'
import { PerpTypeButtons } from './perp-type'
import { LeverageSlider } from './slider'
import { OrderToast } from './toast'

export function TradeOrder({ marketSlug, marketType }: TradeRouteParams) {
  const [_, setDialog] = useQueryState('dialog')
  const {
    signMessage,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
    failureReason,
  } = useSignMessage()
  const { data } = useTradeData({ marketSlug, marketType })
  const [side, setSide] = useQueryState<TradeSide>('side', {
    defaultValue: 'long',
    clearOnDefault: true,
    parse: (value) => value as TradeSide,
  })

  const [leverage] = useQueryState<number>('lev', {
    parse: (value) => Number.parseFloat(value),
  })
  const [quantity, setQuantity] = useState<string>('1000')

  const order = {
    pair: marketSlug.split('-')[0],
    type: 'market',
    side,
    size: Number.parseFloat(quantity), // * leverage
    price: 0,
    stopPrice: 0,
    trailingPercent: 0,
    reduceOnly: false,
    postOnly: false,
    timeInForce: 'GTC',
    leverage,
    marginType: 'cross',
  }

  const executeOrder = () => {
    const orderMessage = JSON.stringify(order)
    signMessage({ message: orderMessage })
  }

  // User notifications
  useEffect(() => {
    if (isPending) {
      toast.custom((t) => <OrderToast size={order.size} status="loading" />, {
        id: 'order-execution',
        // biome-ignore lint/style/useNumberNamespace: <explanation>
        duration: Infinity,
      })
    } else if (isSuccess) {
      toast.custom((t) => <OrderToast size={order.size} status="success" />, {
        id: 'order-execution',
        duration: 5000,
      })
      setTimeout(() => reset(), 5000)
    } else if (isError && error) {
      toast.custom(
        (t) => (
          <OrderToast
            size={order.size}
            status="error"
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            errorMessage={(failureReason?.cause as any).message}
          />
        ),
        { id: 'order-execution', duration: 5000 },
      )
      setTimeout(() => reset(), 5000)
    }
  }, [isPending, isSuccess, isError, error, reset, order.size, failureReason])

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { underlierSymbol } = useTradeRoute()
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

          {appConfig.features.aiAssistant && (
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
          disabled={address ? isPending || quantity === '0' : false}
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
