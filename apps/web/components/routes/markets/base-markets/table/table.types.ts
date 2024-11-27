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

export enum SortKey {
  name = 'name',
  price = 'price',
  change = 'change',
  volume = 'total_volume_24h',
  oi = 'total_open_interest',
}

export enum Direction {
  asc = 'ASC',
  desc = 'DESC',
}
