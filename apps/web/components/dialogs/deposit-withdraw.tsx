'use client'

import { useMarket } from '@opyn/hooks'
import { formatCurrency } from '@opyn/lib'
import { useSupabaseClient } from '@opyn/supabase'
import { getMarket } from '@opyn/supabase'
import type { Tables } from '@opyn/supabase'
import { DialogContent, DialogHeader, DialogTitle } from '@opyn/ui'
import { QuantityInput } from '@opyn/ui'
import { Button } from '@opyn/ui'
import { Card } from '@opyn/ui'
import { Label } from '@opyn/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@opyn/ui'
import { CurrencyIcon } from '@opyn/ui'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect, useMemo, useState } from 'react'
import { erc20Abi, formatUnits, getAddress, parseUnits } from 'viem'
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

const DECIMALS = 2

export function DepositWithdraw() {
  const [activeTab, setActiveTab] = useQueryState('dialog', {
    defaultValue: 'deposit',
  })
  const { underlierSymbol, numeraireSymbol } = useMarket()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {activeTab === 'deposit' ? 'Deposit' : 'Withdraw'} Collateral
        </DialogTitle>
        <DialogDescription className="text-neutral-light">
          {underlierSymbol}-{numeraireSymbol} - {numeraireSymbol}
        </DialogDescription>
      </DialogHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 h-9">
          <TabsTrigger value="deposit" variant="primary">
            Deposit
          </TabsTrigger>
          <TabsTrigger value="withdraw" variant="primary">
            Withdraw
          </TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          <DepositContent />
        </TabsContent>
        <TabsContent value="withdraw">
          <WithdrawContent />
        </TabsContent>
      </Tabs>
    </DialogContent>
  )
}

function WithdrawContent() {
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [amount, setAmount] = useState<string>('1,000')
  const { marketSlug, marketId } = useMarket()
  const supabase = useSupabaseClient()
  const { data: market } = useQuery({
    queryKey: ['market', marketSlug],
    queryFn: () => getMarket({ marketId, supabase }),
    enabled: !!marketSlug,
  })
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const numeraire = market?.numeraire

  // return for now, skeleton loading state later
  if (!numeraire) return

  const withdraw = () => {
    if (!address || !numeraire?.address || !amount) return
    const quantity = Number.parseFloat(amount)
      .toFixed(numeraire.decimals)
      .replaceAll(',', '')
      .replaceAll('.', '')

    // send to self for testing
    writeContract({
      address: getAddress(numeraire.address),
      abi: erc20Abi,
      functionName: 'transfer',
      args: [address, BigInt(quantity)],
    })
  }

  // friendly error message
  const errorMessage = error?.message
    ?.split('\n\nRequest Arguments:')[0]
    .split('\n\nContract Call:')[0]

  return (
    <div className="text-neutral-light">
      <div className="mb-6 ">
        <Label htmlFor="amount" className="text-sm text-gray-400">
          Amount
        </Label>

        <QuantityInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          deco={<CurrencyIcon currency={numeraire.symbol || 'USDC'} />}
          className="bg-primary"
        />

        {numeraire ? <Balance asset={numeraire} setAmount={setAmount} /> : null}
      </div>

      {numeraire ? (
        <PositionInfo asset={numeraire} amount={amount} action="withdraw" />
      ) : null}

      <ChainWarning action="withdraw" />

      <CollateralWarning action="withdraw" />

      {!address ? (
        <Button
          className="w-full bg-white text-black hover:bg-gray-200"
          onClick={openConnectModal}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          className="w-full bg-white text-black hover:bg-gray-200"
          onClick={withdraw}
          disabled={isPending || isLoading}
        >
          {isPending || isLoading
            ? 'Withdrawing...'
            : isSuccess
              ? 'Withdrew!'
              : `Withdraw ${numeraire.symbol}`}
        </Button>
      )}

      {error && (
        <div className="text-red-500 text-sm text-center mt-4">
          {errorMessage}
        </div>
      )}
    </div>
  )
}

function DepositContent() {
  const router = useRouter()
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [amount, setAmount] = useState<string>('1,000')
  const { marketSlug, marketId, marketType } = useMarket()
  const supabase = useSupabaseClient()
  const { data: market } = useQuery({
    queryKey: ['market', marketSlug],
    queryFn: () => getMarket({ marketId, supabase }),
    enabled: !!marketSlug,
  })
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })
  useEffect(() => {
    // refresh the page to update the equity value in the health component
    isSuccess && setTimeout(() => router.refresh(), 3000)
  }, [isSuccess, router])

  // return for now, skeleton loading state later
  if (!market || !market.numeraire || !market.controller) return null

  const numeraire = market.numeraire

  const deposit = () => {
    if (!numeraire?.address) return null
    if (!address || !numeraire.address || !amount) return
    const quantity = parseUnits(amount.replace(/,/g, ''), numeraire.decimals)

    writeContract({
      address: getAddress(numeraire.address),
      abi: erc20Abi,
      functionName: 'transfer',
      args: [getAddress(market?.controller || '0x'), quantity],
    })
  }

  const errorMessage = error?.message
    ?.split('\n\nRequest Arguments:')[0]
    .split('\n\nContract Call:')[0]

  return (
    <div className="text-neutral-light">
      <div className="mb-6">
        <Label htmlFor="amount" className="text-sm text-gray-400">
          Amount
        </Label>

        <QuantityInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          deco={<CurrencyIcon currency={numeraire.symbol} />}
          className="bg-primary"
        />
        <Balance asset={numeraire} setAmount={setAmount} />
      </div>

      <PositionInfo asset={numeraire} amount={amount} action="deposit" />

      <ChainWarning action="deposit" />

      <CollateralWarning action="deposit" />

      {!address ? (
        <Button
          className="w-full bg-white text-black hover:bg-gray-200"
          onClick={openConnectModal}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          className="w-full bg-white text-black hover:bg-gray-200"
          onClick={deposit}
          disabled={isPending || isLoading}
        >
          {isPending || isLoading
            ? 'Depositing...'
            : isSuccess
              ? 'Deposited!'
              : `Deposit ${numeraire.symbol}`}
        </Button>
      )}

      {error && (
        <div className="text-red-500 text-sm text-center mt-4">
          {errorMessage}
        </div>
      )}
    </div>
  )
}

function PositionInfo({
  asset,
  action,
  amount,
}: { asset: Tables<'asset'>; amount: string; action: 'withdraw' | 'deposit' }) {
  // TODO: get position info from supa
  const position = {
    collateral: 0,
    liq: {
      low: 0,
      high: 0,
    },
  }

  // NOTE: we assume 2 decimal places for all values for demo purposes
  const projected = useMemo(() => {
    const isDeposit = action === 'deposit'

    try {
      const amountBigInt = parseUnits(amount.replace(',', ''), DECIMALS)
      const collateralBigInt = BigInt(position.collateral)
      const liqLowBigInt = BigInt(position.liq.low)
      const liqHighBigInt = BigInt(position.liq.high)

      const newCollateral = isDeposit
        ? collateralBigInt + amountBigInt
        : collateralBigInt - amountBigInt
      const newLiqLow = isDeposit
        ? liqLowBigInt + amountBigInt
        : liqLowBigInt - amountBigInt
      const newLiqHigh = isDeposit
        ? liqHighBigInt + amountBigInt
        : liqHighBigInt - amountBigInt

      return {
        collateral: formatCurrency({
          value: formatUnits(newCollateral, DECIMALS),
        }),
        liq: {
          low: formatCurrency({
            value: formatUnits(newLiqLow, DECIMALS),
          }),
          high: formatCurrency({
            value: formatUnits(newLiqHigh, DECIMALS),
          }),
        },
      }
    } catch (error) {
      console.error('Error calculating projected values:', error)
      return {
        collateral: formatCurrency({
          value: formatUnits(BigInt(position.collateral), DECIMALS),
        }),
        liq: {
          low: formatCurrency({
            value: formatUnits(BigInt(position.liq.low), DECIMALS),
          }),
          high: formatCurrency({
            value: formatUnits(BigInt(position.liq.high), DECIMALS),
          }),
        },
      }
    }
  }, [amount, action])

  return (
    <div className="space-y-2 mb-6 text-xs text-neutral-light">
      <div className="flex justify-between ">
        <span>Total {asset.symbol} Collateral</span>
        <span>
          {formatCurrency({
            value: formatUnits(BigInt(position.collateral), DECIMALS),
          })}{' '}
          → <span className="text-white">{projected.collateral}</span>
        </span>
      </div>
      <div className="flex justify-between">
        <span>Liquidation price (Low)</span>
        <span>
          {formatCurrency({
            value: formatUnits(BigInt(position.liq.low), DECIMALS),
          })}
          → <span className="text-white">{projected.liq.low}</span>
        </span>
      </div>
      <div className="flex justify-between">
        <span>Liquidation price (High)</span>
        <span>
          {formatCurrency({
            value: formatUnits(BigInt(position.liq.high), DECIMALS),
          })}{' '}
          → <span className="text-white">{projected.liq.high}</span>
        </span>
      </div>
    </div>
  )
}

function ChainWarning({ action }: { action: 'deposit' | 'withdraw' }) {
  // const chainId = useChainId()
  // const { chains, switchChain } = useSwitchChain()

  return (
    <Card variant="outline" className="flex items-center space-x-2 mb-6 p-3 ">
      <span className="w-5 h-5 flex-shrink-0 items-center justify-center">
        <svg width={19} height={20} viewBox="0 0 19 20" fill="none">
          <rect
            x="1.2"
            y="1.2"
            width="16.8"
            height="17.6"
            rx="8.4"
            fill="url(#pattern0_1_2412)"
            stroke="#3D4043"
            strokeWidth="1.6"
          />
          <defs>
            <pattern
              id="pattern0_1_2412"
              patternContentUnits="objectBoundingBox"
              width={1}
              height={1}
            >
              <use
                xlinkHref="#image0_1_2412"
                transform="matrix(0.00412797 0 0 0.00392157 -0.0263159 0)"
              />
            </pattern>
            <image
              id="image0_1_2412"
              width={255}
              height={255}
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </span>
      <div className="text-sm text-neutral-light">
        {action === 'deposit' ? (
          <p>
            Make sure you are connected to the{' '}
            <span className="font-semibold text-white">Arbitrum</span> network,
            or your deposit will fail.
          </p>
        ) : (
          <p>
            Make sure you are connected to the{' '}
            <span className="font-semibold text-white">Arbitrum</span> network,
            or your withdrawal will fail.
          </p>
        )}
      </div>
    </Card>
  )
}

function CollateralWarning({ action }: { action: 'deposit' | 'withdraw' }) {
  return (
    <Card
      variant="outline"
      className="flex items-start space-x-2 mb-6 text-sm text-neutral-light"
    >
      <span className="flex items-center justify-center self-stretch flex-shrink-0">
        <AlertCircle className="w-5 h-5" />
      </span>

      <p>
        {action === 'deposit'
          ? 'Collateral is tied to an individual market. Any assets you deposit here cannot be used as collateral for other markets without first withdrawing.'
          : "Withdrawing reduces your total collateral for all markets. This may affect your position's health and increase liquidation risk. Consider the impact before proceeding."}
      </p>
    </Card>
  )
}

function Balance({
  asset,
  setAmount,
}: { asset: Tables<'asset'>; setAmount: (amount: string) => void }) {
  const { address } = useAccount()

  const { data: balance, refetch } = useReadContract({
    address: getAddress(asset.address),
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address ?? '0x'],
    query: {
      enabled: Boolean(address) && Boolean(asset.address),
      refetchInterval: 5000,
    },
  })

  const formattedBalance = formatCurrency({
    value: formatUnits(balance || 0n, asset.decimals),
  })

  useEffect(() => {
    if (asset.address) {
      refetch()
    }
  }, [asset.address, refetch])

  return (
    <div className="flex justify-between text-sm text-gray-400 mt-2">
      <span>{formattedBalance}</span>
      <span className="flex items-center gap-2">
        <span>Balance: {formattedBalance}</span>

        <span
          className="cursor-pointer text-brand"
          onClick={() => setAmount(formatUnits(balance || 0n, asset.decimals))}
        >
          Max
        </span>
      </span>
    </div>
  )
}
