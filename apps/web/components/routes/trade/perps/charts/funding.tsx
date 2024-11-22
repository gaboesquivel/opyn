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

interface FundingDataPoint {
  timestamp: number
  rate: number
}

export function FundingChart() {
  const [data, setData] = useState<FundingDataPoint[]>([])

  // TODO: Replace with actual funding rate data fetching
  useEffect(() => {
    const mockData = Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - i * 24 * 60 * 60 * 1000,
      rate: (Math.random() - 0.5) * 0.01, // Random rate between -0.5% and 0.5%
    })).reverse()

    setData(mockData)
  }, [])

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString()
  }

  const formatRate = (rate: number) => {
    return `${(rate * 100).toFixed(4)}%`
  }

  return (
    <Card className="flex flex-col h-full max-h-full flex-1 pb-0 m-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <h3 className="font-medium">Funding Rate History</h3>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fundingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              stroke="#666"
              fontSize={12}
            />
            <YAxis tickFormatter={formatRate} stroke="#666" fontSize={12} />
            <Tooltip
              formatter={(value: number) => formatRate(value)}
              labelFormatter={(label: number) => formatDate(label)}
              contentStyle={{
                backgroundColor: '#1B1C1D',
                border: '1px solid #333',
                borderRadius: '6px',
              }}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#fundingGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
