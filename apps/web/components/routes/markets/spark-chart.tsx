'use client'

import { Line, LineChart } from 'recharts'

export function SparkChart({
  data,
  trend,
}: { data: { value: number }[]; trend: 'up' | 'down' }) {
  return (
    <LineChart width={100} height={24} data={data}>
      <Line
        type="monotone"
        dataKey="value"
        stroke={trend === 'up' ? '#29E03B' : '#FA5C38'}
        strokeWidth={1.5}
        dot={false}
        animationDuration={0}
      />
    </LineChart>
  )
}
