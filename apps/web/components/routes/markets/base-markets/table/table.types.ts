export interface MarketRowDataProps {
  icon: string
  name: string
  markets: number
  price: number
  change: number
  volume: number
  oi: number
  data: { value: number }[]
  trend: 'up' | 'down'
}
