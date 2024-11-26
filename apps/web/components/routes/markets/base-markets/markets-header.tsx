import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function MarketsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-semibold">Markets</h1>
      <Button
        size="default"
        variant="brand"
        className="flex flex-row items-center gap-1"
      >
        Deploy a market <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
