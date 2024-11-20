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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { appConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import type { OrderType, PerpType, TradeSide } from '@opyn/api'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { CheckIcon, Loader2, SettingsIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useSignMessage } from 'wagmi'
import { useAccount } from 'wagmi'
import { useTradeData } from '../hooks/use-trade-data'
import { useTradeRoute } from '../hooks/use-trade-route'
import type { TradeRouteParams } from '../routing'
import { PerpTypeButtons } from '../trading-perp-type-buttons'

export function TradingSidebar({ marketSlug, trade }: TradeRouteParams) {
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
  const { data } = useTradeData({ marketSlug, trade })
  const [side, setSide] = useQueryState<TradeSide>('side', {
    defaultValue: 'long',
    clearOnDefault: true,
    parse: (value) => value as TradeSide,
  })

  const [leverage, setLeverage] = useQueryState<number>('lev', {
    defaultValue: 0.1,
    clearOnDefault: true,
    parse: (value) => Number.parseFloat(value),
  })
  const [quantity, setQuantity] = useState<string>('1000')
  const [sliderValue, setSliderValue] = useState(0)
  const order: OrderType = {
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

  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()

  return (
    <Card variant="padded" className="h-full">
      <div className=" min-w-[270px] h-full flex flex-col">
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
          deco={<CurrencyIcon currency={data?.market.underlier || 'ETH'} />}
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

        <div className="my-4 relative text-neutral-light flex w-full gap-4 swiper-no-swiping">
          <div className="flex-1 swiper-no-swiping">
            <Slider
              value={[sliderValue]}
              onValueChange={(value) => {
                const newSliderValue = value[0]
                setSliderValue(newSliderValue)
                const leverage = mapSliderToLeverage(newSliderValue)
                setLeverage(leverage)
              }}
              min={0}
              max={100}
              step={0.1}
              className="w-full cursor-pointer"
              variant="brand"
            />
            <div className="flex justify-between text-xs mt-2 px-1">
              {leverageValues.map((value, index) => (
                <span
                  key={`${value}X`}
                  className="cursor-pointer"
                  onClick={() => {
                    const newSliderValue = sliderPositions[index]
                    setSliderValue(newSliderValue)
                    setLeverage(value)
                  }}
                >
                  {value}x
                </span>
              ))}
            </div>
          </div>
          <div className="bg-secondary px-2 py-1 rounded text-sm items-center flex justify-center text-center min-w-[55px]">
            {leverage}X
          </div>
        </div>
        {/* <ScrollArea className="h-[250px] w-full rounded-md border p-4"> */}
        <div className="hidden sm:block">
          <PositionInfo />
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full text-neutral-light text-xs"
        >
          <AccordionItem value="item-1" className="border-0 sm:hidden">
            <AccordionTrigger className="hover:no-underline">
              Position Info
            </AccordionTrigger>
            <AccordionContent className="text-xs">
              <PositionInfo />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-0">
            <AccordionTrigger className="hover:no-underline">
              Payoff Index
            </AccordionTrigger>
            <AccordionContent className="text-xs">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* </ScrollArea> */}

        <div className="mt-auto">
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
      </div>
    </Card>
  )
}

function PositionInfo() {
  return (
    <div className="space-y-2 text-xs mb-4 text-neutral-light">
      <div className="flex justify-between">
        <span className="">Asset Leverage</span>
        <span>
          2X → <span className="text-white">20X</span>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="">Liquidation price (Low)</span>
        <span>
          $3,000.00 → <span className="text-white">$3,100.00</span>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="">Liquidation price (High)</span>
        <span>
          $3,581.00 → <span className="text-white">$3,308.00</span>
        </span>
      </div>
      <div className="flex justify-between">
        <span className="">Execution Price</span>
        <span className="text-red-500">$3,183.18 -4.18%</span>
      </div>
      <div className="flex justify-between">
        <span className="">Funding</span>
        <span className="text-green-500">+0.002%</span>
      </div>
      <div className="flex justify-between">
        <span className="">Fees</span>
        <span>$71.12</span>
      </div>
    </div>
  )
}

function OrderToast({
  size,
  status,
  errorMessage,
}: {
  size: number
  status: 'loading' | 'success' | 'error'
  errorMessage?: string
}) {
  const { side, perp, marketSlug } = useTradeRoute()
  return (
    <div className="bg-secondary text-white p-4 rounded-lg min-w-[300px] shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{marketSlug}</h2>
        <span className={side === 'long' ? 'text-green-400' : 'text-red-400'}>
          {side.charAt(0).toUpperCase() + side.slice(1)}
        </span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-400">{perp} Perp</span>
        <span className="text-lg">{size}</span>
      </div>
      <div
        className={cn(
          'flex items-center text-sm',
          status === 'error' && 'text-negative',
          // status === 'success' && 'text-positive',
          status !== 'error' && 'text-gray-400',
        )}
      >
        {status === 'loading' && (
          <>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            <span>Submitting order...</span>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckIcon className="mr-2 h-4 w-4" />
            <span>Order executed successfully</span>
          </>
        )}
        {status === 'error' && (
          <>
            <XIcon className="mr-2 h-4 w-4" />
            <span>Error: {errorMessage}</span>
          </>
        )}
      </div>
    </div>
  )
}

// Define the types for the arrays
const sliderPositions: number[] = [0, 18.6, 32.4, 46.9, 62.1, 79.7, 100] // Slider UI positions including 0
const leverageValues: number[] = [0.1, 1, 2, 5, 10, 15, 20] // Corresponding leverage values

// Function to floor a number to one decimal place
function floorToOneDecimal(num: number): number {
  return Math.floor(num * 10) / 10
}

// Function to map slider value (0-100) to leverage value using piecewise linear interpolation
function mapSliderToLeverage(sliderValue: number): number {
  for (let i = 0; i < sliderPositions.length - 1; i++) {
    const startPos = sliderPositions[i]
    const endPos = sliderPositions[i + 1]

    if (sliderValue >= startPos && sliderValue <= endPos) {
      // Linear interpolation between two leverage values
      const ratio = (sliderValue - startPos) / (endPos - startPos)
      const startLev = leverageValues[i]
      const endLev = leverageValues[i + 1]

      // Calculate leverage and floor to 1 decimal place
      return floorToOneDecimal(startLev + ratio * (endLev - startLev))
    }
  }

  return leverageValues[leverageValues.length - 1] // Return max leverage if slider value exceeds max range
}
