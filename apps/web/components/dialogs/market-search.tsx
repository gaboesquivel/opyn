'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { getMarketLabel, getMarketSlug } from '@/lib/opyn'
import { useSupabaseClient } from '@/services/supabase'
import { getMarkets } from '@/services/supabase'
import { useQuery } from '@tanstack/react-query'
import { useTradeRoute } from '../routes/trade/hooks/use-trade-route'

export default async function MarketSearch() {
  const supabase = useSupabaseClient()
  const [searchTerm, setSearchTerm] = useState('')
  const searchParams = useSearchParams()
  const { marketType } = useTradeRoute()
  const { data: markets = [] } = useQuery({
    queryKey: ['markets-search', marketType],
    queryFn: () =>
      getMarkets({
        marketType,
        supabase,
      }),
  })

  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  const filteredMarkets = markets.filter((market) => {
    if (!searchTerm) return true
    return (
      market.underlier?.symbol
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      market.numeraire?.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <DialogContent className="sm:max-w-[425px] h-[100dvh] sm:min-h-[500px] !sm:h-[500px]  sm:max-h-[500px] items-start flex flex-col">
      <DialogHeader>
        <DialogTitle className="text-center">Select Market</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4 ">
        <div className="flex items-center gap-4">
          <Search className="h-4 w-4 opacity-50" />
          <Input
            ref={searchInputRef}
            placeholder="Search market..."
            value={searchTerm}
            onChange={handleSearch}
            className="col-span-3"
          />
        </div>
        <div className="overflow-y-auto sm:min-h-[300px] sm:h-[300px]  sm:max-h-[300px]">
          {filteredMarkets?.map((market) => (
            <Link
              key={market.id}
              href={{
                pathname: `/trade/${marketType}/${getMarketSlug(market)}`,
                query: Object.fromEntries(
                  Array.from(searchParams.entries()).filter(
                    ([key]) => key !== 'dialog',
                  ),
                ),
              }}
              passHref
              legacyBehavior
            >
              <Button
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                {getMarketLabel(market)}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </DialogContent>
  )
}
