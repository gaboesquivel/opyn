import { Providers } from '@/components/layout/providers'
import { OpynNuqsAdapter } from '@opyn/hooks'
import { Card } from '@opyn/ui'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <OpynNuqsAdapter>
        <Card>{children}</Card>
      </OpynNuqsAdapter>
    </Providers>
  )
}
