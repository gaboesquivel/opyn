import { MarketsTable } from '@/components/routes/markets/base-markets/table/markets-table'
import { MarketSearchInput } from '@/components/routes/markets/search-input'
import { Switch } from '@/components/ui/switch'

export default function MarketsSearchSection() {
  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <div className="relative flex-1">
          <MarketSearchInput />
        </div>
        <div className="flex items-center gap-2">
          <Switch />
          <span className="text-sm text-gray-400">Your positions</span>
        </div>
      </div>

      <div className="overflow-hidden">
        <MarketsTable />
      </div>
    </>
  )
}
