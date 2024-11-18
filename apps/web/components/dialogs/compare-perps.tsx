'use client'

import { TrendDownIcon, TrendUpIcon } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import { Line, LineChart, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts'

export function ComparePerps() {
  const [side, setSide] = useState<'long' | 'short'>('long')
  const [amount, setAmount] = useState('1,000.00')
  const [currency, setCurrency] = useState('USD')

  const chartData = [
    { price: 3000 },
    { price: 3500 },
    { price: 3831 },
    { price: 4200 },
    { price: 4600 },
  ]

  // TODO: implement real pnl calculation
  const calculatePnL = (perp: number) => {
    const basePrice = 3831
    const currentPrice = 3831
    const amountBigInt = BigInt(amount.replace(',', '').replace('.', ''))
    const pnl =
      side === 'long'
        ? Number(
            ((currentPrice - basePrice) * perp * Number(amountBigInt)) /
              basePrice,
          )
        : Number(
            ((basePrice - currentPrice) * perp * Number(amountBigInt)) /
              basePrice,
          )
    return pnl.toFixed(2)
  }

  return (
    <DialogContent className="max-h-[80dvh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Perp Simulator</DialogTitle>
        <DialogDescription className="text-neutral-light">
          Tooltips are used to describe or identify an element. In most
          scenarios, tooltips help the user understand meaning, func...
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mb-6">
        <div className="flex">
          <div className="w-1/2 pr-4">
            <div className="text-sm font-medium">Position Direction</div>
            <div className="text-xs text-gray-400">Description goes here</div>
          </div>
          <div className="w-1/2 flex justify-end space-x-2">
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
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-1/2 pr-4">
            <div className="text-sm font-medium">Position Size</div>
            <div className="text-xs text-gray-400">Description goes here</div>
          </div>
          <div className="w-1/2 flex justify-end space-x-2">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-20 bg-gray-800 border-gray-700">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-32 bg-gray-800 border-gray-700 text-right"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-right text-green-400 text-2xl font-bold mb-2">
          PnL: ${calculatePnL(1)}
        </p>
        <div className="h-40">
          <LineChart width={300} height={150} data={chartData}>
            <XAxis dataKey="price" hide />
            <YAxis hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              dot={false}
            />
            <ReferenceLine y={3831} stroke="white" strokeDasharray="3 3" />
          </LineChart>
        </div>
        <p className="text-center">Price of ETH: $3,831.00</p>
      </div>

      <div className="space-y-2">
        <p className="font-bold mb-2">Perp PnL</p>
        {[0, 0.5, 1, 2].map((perp) => (
          <div key={perp} className="flex justify-between items-center">
            <div className="flex items-center">
              <Eye size={16} className="mr-2" />
              <span>{perp} Perp</span>
            </div>
            <span className="text-green-400">+${calculatePnL(perp)}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        *All return data excludes funding
      </p>
    </DialogContent>
  )
}
