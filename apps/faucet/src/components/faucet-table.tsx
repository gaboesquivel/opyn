import { DEFAULT_BALANCE } from '@/lib/contants'
import { useBurn, useMint, useStablecoins, useSupply } from '@opyn/hooks'

import { formatCurrency } from '@opyn/lib'
import type { Tables } from '@opyn/supabase'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@opyn/ui'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useQueryStates } from 'nuqs'
import { useEffect } from 'react'
import { type Address, formatUnits, getAddress, parseUnits } from 'viem'
import { sepolia } from 'viem/chains'
import { useAccount, useBalance, useSwitchChain } from 'wagmi'
import { AddTokenToWallet } from './add-token-to-metamask'

export function FaucetTable() {
  const { stablecoins } = useStablecoins()

  return (
    <div className="flex flex-col w-full max-w-[1.5*md] items-start gap-4">
      <div className="w-full mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Supply</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stablecoins?.map((stablecoin) => (
              <StablecoinRow key={stablecoin.uuid} asset={stablecoin} />
            ))}
          </TableBody>
        </Table>
      </div>
      <FaucetDialog />
    </div>
  )
}

function StablecoinRow({ asset }: { asset: Tables<'asset'> }) {
  const { address } = useAccount()
  const [{ refetch_data }, setQueryStates] = useFaucetStates()
  const tokenBalance = useBalance({
    address,
    token: getAddress(asset?.address || ''),
  })
  const tokenSupply = useSupply({
    token: getAddress(asset?.address || ''),
  })

  const handleAction = (action: 'mint' | 'burn') => {
    setQueryStates({
      action,
      token: getAddress(asset?.address || ''),
      quantity: '42000',
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!refetch_data) return

    console.log('refetching')
    tokenSupply.refetch()
    tokenBalance.refetch()
    setQueryStates({ refetch_data: false })
  }, [refetch_data, setQueryStates])

  if (!asset) return null
  return (
    <>
      <TableRow>
        <TableCell>{asset.symbol}</TableCell>
        <TableCell>{asset.name}</TableCell>
        <TableCell>
          {tokenBalance.data && tokenBalance.data.value > 0
            ? formatCurrency({
                value: formatUnits(
                  tokenBalance.data.value,
                  tokenBalance.data.decimals,
                ),
              })
            : DEFAULT_BALANCE}
        </TableCell>
        <TableCell>
          {tokenSupply.supply
            ? formatCurrency({
                value: formatUnits(tokenSupply.supply, asset.decimals),
              })
            : DEFAULT_BALANCE}
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="up"
              onClick={() => handleAction('mint')}
              disabled={!address}
            >
              Mint
            </Button>
            <Button
              size="sm"
              variant="down"
              onClick={() => handleAction('burn')}
              disabled={!address}
            >
              Burn
            </Button>
            <AddTokenToWallet {...asset} />
          </div>
        </TableCell>
      </TableRow>
    </>
  )
}

function FaucetDialog() {
  const account = useAccount()
  const { openConnectModal } = useConnectModal()
  const { stablecoins } = useStablecoins()
  const [{ action, quantity, token }, setQueryStates] = useFaucetStates()

  const asset = stablecoins?.find((stablecoin) => stablecoin.address === token)
  const amount = parseUnits(quantity || '0', asset?.decimals || 0)
  const tokenAddress = asset?.address as Address

  console.log({ symbol: asset?.symbol, amount, tokenAddress, action })

  const minter = useMint({
    tokenAddress,
    amount,
  })
  const burner = useBurn({
    tokenAddress,
    amount,
  })
  const handleClose = () => {
    setQueryStates({
      token: null,
      quantity: null,
      action: null,
      refetch_data: true,
    })
    minter.reset()
    burner.reset()
  }
  const { switchChain } = useSwitchChain()

  const handleMint = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await switchChain({ chainId: sepolia.id })
    minter.mint()
  }

  const handleBurn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await switchChain({ chainId: sepolia.id })
    burner.burn()
  }

  const isOpen = action === 'mint' || action === 'burn'
  const isPending = minter.isPending || burner.isPending
  const isCurrentAction = (currentAction: string) => action === currentAction
  const hash = isCurrentAction('mint') ? minter.data : burner.data
  const isSuccess = Boolean(hash)
  const failureReason = minter.failureReason || burner.failureReason

  if (!asset) return null
  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isCurrentAction('mint') ? 'Mint' : 'Burn'} {asset.symbol}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isSuccess ? (
              <a
                href={`https://sepolia.arbiscan.io/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-brand-400"
              >
                View transaction: <span className="text-brand-500">{hash}</span>
              </a>
            ) : (
              `Enter the amount you want to ${isCurrentAction('mint') ? 'mint' : 'burn'}`
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {!isSuccess && (
          <div className="flex flex-col gap-2 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="quantity">Amount</Label>
              <Input
                id="quantity"
                value={quantity}
                onChange={(e) => setQueryStates({ quantity: e.target.value })}
                type="currency"
                min="1"
                max="1000"
                placeholder="Enter amount"
                onKeyDown={(e) => {
                  if (e.key === '.' || e.key === ',') {
                    e.preventDefault()
                  }
                }}
              />
            </div>

            {failureReason && (
              <p className="text-error-500 text-sm text-center">
                {failureReason.message.split('Request Arguments:')[0]}
              </p>
            )}
          </div>
        )}

        <AlertDialogFooter>
          {isSuccess ? (
            <AlertDialogCancel className="h-10 min-w-[150px]">
              Close
            </AlertDialogCancel>
          ) : (
            <>
              <AlertDialogCancel
                className="h-10 min-w-[150px]"
                onClick={handleClose}
              >
                Cancel
              </AlertDialogCancel>
              {account ? (
                <AlertDialogAction
                  onClick={isCurrentAction('mint') ? handleMint : handleBurn}
                  disabled={isPending}
                  variant={isCurrentAction('mint') ? 'up' : 'down'}
                  className="h-10 min-w-[150px]"
                >
                  {isPending
                    ? 'Processing...'
                    : isCurrentAction('mint')
                      ? 'Mint'
                      : 'Burn'}
                </AlertDialogAction>
              ) : (
                <AlertDialogAction
                  onClick={() => openConnectModal?.()}
                  variant={'brand'}
                  className="h-10 min-w-[150px]"
                >
                  {isPending ? 'Connecting...' : 'Connect Wallet'}
                </AlertDialogAction>
              )}
            </>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function useFaucetStates() {
  return useQueryStates({
    action: {
      defaultValue: undefined,
      parse: (value: string) => value as 'mint' | 'burn' | undefined,
    },
    quantity: {
      defaultValue: '42000',
      clearOnDefault: false,
      parse: (value: string) => value as string,
    },
    token: {
      clearOnDefault: false,
      defaultValue: undefined,
      parse: (value: string) => getAddress(value),
    },
    refetch_data: {
      defaultValue: false,
      parse: (value: string) => value === 'true',
    },
  })
}
