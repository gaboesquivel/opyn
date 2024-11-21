'use client'

import { useTradeRoute } from '@/components/routes/trade/hooks/use-trade-route'
import { cn } from '@/lib/utils'
import { CheckIcon, Loader2, XIcon } from 'lucide-react'

export function OrderToast({
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
