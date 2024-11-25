'use client'

import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table'
import { ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon } from 'lucide-react'
import { MarketRow } from '@/components/routes/markets/base-markets/market-row'
import { createParser, parseAsStringEnum, useQueryState } from 'nuqs'
import { ReactElement, ReactNode, useMemo } from 'react'

const generateData = (points: number, trend: "up" | "down") => 
  Array.from({ length: points }, (_, i) => ({
    value: trend === "up" 
      ? 50 + Math.random() * 50 + i 
      : 100 - (Math.random() * 50 + i)
  }))

type SortKey = "name" | "price" | "change" | "volume" | "oi"

enum Direction {
  asc = "ASC",
  desc = "DESC"
}

const sortKeyParser = createParser({
  parse(queryValue) {
    return ["name", "price", "change", "volume", "oi"].includes(queryValue) ? queryValue as SortKey : null
  },
  serialize(value) {
    return ["name", "price", "change", "volume", "oi"].includes(value) ? value : ''
  }
})

export function MarketsTable() {
  const [sortKey, setSortKey] = useQueryState("sortBy", sortKeyParser)
  const [sortOrder, setSortOrder] = useQueryState("order", parseAsStringEnum<Direction>(Object.values(Direction)))

  const marketData = useMemo(()=>[
    {
      icon: "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/ethereum.png",
      name: "Ethereum",
      markets: "24",
      price: 3000.00,
      change: 5.83,
      volume: 437,
      oi: 35.6,
      data: generateData(20, "up"),
      trend: "up" as const,
    },
    {
      icon: "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/bitcoin.png",
      name: "Bitcoin",
      markets: "2",
      price: 3000.00,
      change: 5.83,
      volume: 437,
      oi: 35.6,
      data: generateData(20, "up"),
      trend: "up" as const,
    },
    {
      icon: "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/arbitrum.png",
      name: "Arbitrum",
      markets: "8",
      price: 3000.00,
      change: -5.83,
      volume: 437,
      oi: 35.6,
      data: generateData(20, "down"),
      trend: "down" as const,
    },
    {
      icon: "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/bonk.png",
      name: "BONK",
      markets: "1",
      price: 3000.00,
      change: 5.83,
      volume: 437,
      oi: 35.6,
      data: generateData(20, "up"),
      trend: "up" as const,
    },
  ], [])

  const sortedMarketData = [...marketData].sort((a, b) => {
    const sortingKey = sortKey || "name"
    return a[sortingKey] < b[sortingKey] ? (sortOrder === Direction.asc ? -1 : 1) :
           a[sortingKey] > b[sortingKey] ? (sortOrder === Direction.asc ? 1 : -1) : 0
  })

  const toggleSort = (key: SortKey) => {    
    if (key === sortKey) {
      setSortOrder(sortOrder === Direction.asc ? Direction.desc : Direction.asc)
    } else {
      setSortKey(key)
      setSortOrder(Direction.asc)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Market</TableHead>
          <TableHead></TableHead>
          <TableHead>
            <SortButton sortkey='price' currentSorting={sortKey} sortDir={sortOrder} toggleSort={toggleSort}>
              Price
            </SortButton>
          </TableHead>
          <TableHead>
            <SortButton sortkey='change' currentSorting={sortKey} sortDir={sortOrder} toggleSort={toggleSort}>
              24h Change
            </SortButton>
          </TableHead>
          <TableHead>
            <SortButton sortkey='volume' currentSorting={sortKey} sortDir={sortOrder} toggleSort={toggleSort}>
              24h Volume
            </SortButton>
          </TableHead>
          <TableHead>
            <SortButton sortkey='oi' currentSorting={sortKey} sortDir={sortOrder} toggleSort={toggleSort}>
              Open Interest
            </SortButton>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedMarketData.map((market, index) => (
          <MarketRow
            key={index}
            icon={market.icon}
            name={market.name}
            markets={market.markets}
            price={`$${market.price.toFixed(2)}`}
            change={`${market.change > 0 ? '+' : ''}${market.change.toFixed(2)}%`}
            volume={`$${market.volume}m`}
            oi={`$${market.oi}m`}
            data={market.data}
            trend={market.trend}
          />
        ))}
      </TableBody>
    </Table>
  )
}

export function SortButton({sortkey, currentSorting, sortDir, toggleSort, children}: {sortkey: SortKey, currentSorting: SortKey | null, sortDir: Direction | null, toggleSort: (key: SortKey)=>void, children: ReactNode}): ReactElement{
 
  return (
    <Button variant="ghost" size="sm" className="h-8 p-0 m-0 hover:bg-transparent" onClick={() => toggleSort(sortkey)}>
      {children}
      {sortkey === currentSorting ? (sortDir === Direction.asc ? <ChevronUpIcon className="ml-2 h-4 w-4 text-white" /> : <ChevronDownIcon className="ml-2 h-4 w-4 text-white" />) : <ChevronsUpDownIcon className="ml-2 h-4 w-4" />}
    </Button>
  )
}