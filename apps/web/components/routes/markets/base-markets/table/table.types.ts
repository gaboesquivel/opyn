export interface MarketRowDataProps {
    icon: string
    name: string
    markets: string
    price: string
    change: string
    volume: string
    oi: string
    data: { value: number }[]
    trend: "up" | "down"
}