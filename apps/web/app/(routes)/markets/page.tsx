import MarketsHeader from '@/components/routes/markets/base-markets/markets-header'
import MarketsSearchSection from '@/components/routes/markets/base-markets/markets-search-section'
import MarketsStats from '@/components/routes/markets/base-markets/markets-stats'
import type { MarekstPageProps } from '@/components/routes/markets/base-markets/types'

export default async function MarketsPage({ searchParams }: MarekstPageProps) {
  return (
    <div className="bg-background px-28 py-14">
      <div className="mx-auto space-y-6">
        <MarketsHeader />
        <MarketsStats />
        <MarketsSearchSection searchParams={searchParams} />
      </div>
    </div>
  )
}
