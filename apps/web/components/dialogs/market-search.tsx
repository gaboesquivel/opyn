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
import { getMarkets } from '@opyn/api'
import { useTradeRoute } from '../routes/trade/hooks/use-trade-route'

export default function MarketSearch() {
  const tokens = getMarkets({ trade: 'perps' })
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTokens, setFilteredTokens] = useState(tokens)
  const { trade } = useTradeRoute()
  const searchParams = useSearchParams()

  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = tokens.filter(
      (token) =>
        token.label.toLowerCase().includes(term) ||
        token.value.toLowerCase().includes(term),
    )
    setFilteredTokens(filtered)
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
          {filteredTokens.map((token) => (
            <Link
              key={token.value}
              href={{
                pathname: `/trade/${trade}/${token.value}`,
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
                {token.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </DialogContent>
  )
}
