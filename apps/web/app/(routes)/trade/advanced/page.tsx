export default async function AdvancedTradePage({
  params,
  searchParams,
}: AdvancedTradePageProps) {
  return (
    <div className="flex w-full">
      <div className="flex-1">Advanced Trade Page</div>
      <div className="w-[35%] border-l border-border">Sidebar</div>
    </div>
  )
}

interface AdvancedTradePageProps {
  params: AdvancedTradeRouteParams
  searchParams: AdvancedTradeSearchParams
}

interface AdvancedTradeRouteParams {
  slug?: string
}

interface AdvancedTradeSearchParams {
  chart?: string
  market?: string
  position?: string
}
