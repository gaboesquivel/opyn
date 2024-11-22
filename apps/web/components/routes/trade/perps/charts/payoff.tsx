'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface PayoffDataPoint {
  price: number
  pnl: number
}

export function PayoffChart() {
  const [data, setData] = useState<PayoffDataPoint[]>([])

  // TODO: Replace with actual payoff calculation based on position
  useEffect(() => {
    const mockData = Array.from({ length: 100 }, (_, i) => {
      const price = 1000 + i * 50 // Price range from 1000 to 6000
      const pnl = Math.sin((i / 20) * Math.PI) * 1000 // Simulated PnL curve
      return { price, pnl }
    })

    setData(mockData)
  }, [])

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`
  }

  const formatPnl = (pnl: number) => {
    return `$${pnl.toLocaleString()}`
  }

  return (
    <Card className="flex flex-col h-full max-h-full flex-1 pb-0 m-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <h3 className="font-medium">Position Payoff</h3>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="payoffGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="price"
              tickFormatter={formatPrice}
              stroke="#666"
              fontSize={12}
            />
            <YAxis tickFormatter={formatPnl} stroke="#666" fontSize={12} />
            <Tooltip
              formatter={(value: number, name: string) =>
                name === 'pnl' ? formatPnl(value) : formatPrice(value)
              }
              contentStyle={{
                backgroundColor: '#1B1C1D',
                border: '1px solid #333',
                borderRadius: '6px',
              }}
            />
            <Area
              type="monotone"
              dataKey="pnl"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#payoffGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
