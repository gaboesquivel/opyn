import { MobileSwiper } from '@/components/layout/mobile/swiper'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import type { TradeRouteParams, TradeSearchParams } from './routing'

// TODO: move this import to route page
import dynamic from 'next/dynamic'
const TradingPositionsCard = dynamic(
  () =>
    import('@/components/routes/trade/trading-positions/index').then(
      (mod) => mod.TradingPositionsCard,
    ),
  { ssr: false },
)

export function TradingDashboard({
  sidebar,
  nav,
  positions,
  chart,
  market,
  account,
  marketMobile,
  searchParams,
  params,
}: {
  sidebar: React.ReactNode
  nav: React.ReactNode
  positions: React.ReactNode
  chart: React.ReactNode
  market: React.ReactNode
  account: React.ReactNode
  marketMobile: React.ReactNode
  searchParams: TradeSearchParams
  params: TradeRouteParams
}) {
  return (
    <div className="flex flex-col pt-1 sm:p-0 sm:m-4 pb-0 h-full flex-1 ">
      <div className="gap-4 flex flex-col lg:flex-row justify-between items-center w-full mb-3 sm:mb-4 lg:m-0">
        <div className="lg:mb-4 lg:mb-0 flex-shrink-0 w-full lg:w-auto pl-2 sm:pl-0">
          {nav}
        </div>
        <div className="hidden sm:flex justify-center self-start flex-shrink w-full lg:w-auto overflow-hidden h-full">
          {account}
        </div>
      </div>

      <div className="flex-grow flex flex-col min-h-0">
        <div className="sm:hidden flex-grow flex flex-col h-full">
          <div className="mb-3">{market}</div>
          <MobileSwiper
            slides={[
              chart,
              account,
              marketMobile,
              sidebar,
              <TradingPositionsCard key="trading-positions-card" />,
            ]}
          />
        </div>

        {/* Desktop resizable dashboard */}
        <div className="hidden sm:flex flex-grow">
          <ResizablePanelGroup
            direction="horizontal"
            className="gap-2 h-full w-full"
          >
            <ResizablePanel defaultSize={75}>
              {/* set max height to 100vh - footer - header - accountInfo with paddings */}
              {/* <div className="flex flex-col max-h-[calc(100vh-44px-64px-56px-16px-16px)] overflow-y-auto"> */}
              {/* scrollable content goes here, max height to 100vh - footer - header - accountInfo with paddings + market info with padding  + 50px
                so we allow hidding the market info to explore positions more comfy
              */}
              <div className="h-[calc(100vh-44px-64px-56px-16px-16px+72px+16px+50px)] ">
                <ResizablePanelGroup direction="vertical">
                  <div className="mb-4">{market}</div>

                  <ResizablePanel defaultSize={60}>{chart}</ResizablePanel>

                  <ResizableHandle />

                  {/* ResizablePanel inside position component */}
                  {positions}
                </ResizablePanelGroup>
              </div>
              {/*  </div> */}
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel className="flex flex-col flex-1" defaultSize={25}>
              <ResizablePanelGroup
                direction="vertical"
                className="gap-2 max-h-full "
              >
                {/* <div className="flex-grow overflow-auto">{sidebar}</div> */}
                <ResizablePanel defaultSize={90}>{sidebar}</ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={10}>
                  <div />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  )
}