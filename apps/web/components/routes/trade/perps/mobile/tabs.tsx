import { Tabs, TabsContent, TabsList, TabsTrigger } from '@opyn/ui'

export function MobileTabs({
  mobiletab = 'chart',
  sidebar,
  positions,
  chart,
}: {
  mobiletab?: string
  sidebar: React.ReactNode
  positions: React.ReactNode
  chart: React.ReactNode
}) {
  const value = mobiletab || 'chart'
  return (
    <Tabs value={value} className="w-full">
      <TabsList className="bg-subtle h-9 w-full">
        {['chart', 'trade', 'positions'].map((value) => (
          <TabsTrigger
            key={value}
            value={value}
            variant={'primary'}
            className="w-1/4"
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="chart">{chart}</TabsContent>
      <TabsContent value="trade">{sidebar}</TabsContent>
      <TabsContent value="positions">{positions}</TabsContent>
    </Tabs>
  )
}
