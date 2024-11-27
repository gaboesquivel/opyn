'use client'

import { Button, TableHead, TableHeader, TableRow } from '@opyn/ui'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronsUpDownIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { parseAsStringEnum, useQueryState } from 'nuqs'
import type { ReactElement, ReactNode } from 'react'
import { Direction, SortKey } from './table.types'

export default function MarketTableHeader() {
  const router = useRouter()

  const [sortKey, setSortKey] = useQueryState(
    'sortBy',
    parseAsStringEnum<SortKey>(Object.values(SortKey) as SortKey[]),
  )

  const [sortOrder, setSortOrder] = useQueryState(
    'order',
    parseAsStringEnum<Direction>(Object.values(Direction) as Direction[]),
  )

  const toggleSort = async (key: SortKey) => {
    if (key === sortKey) {
      await setSortOrder(
        sortOrder === Direction.asc ? Direction.desc : Direction.asc,
      )
    } else {
      await setSortKey(key)
      await setSortOrder(Direction.asc)
    }
    router.refresh()
  }

  return (
    <TableHeader>
      <TableRow>
        <TableHead>Market</TableHead>
        <TableHead />
        <TableHead>
          <SortButton
            sortkey={SortKey.price}
            currentSorting={sortKey}
            sortDir={sortOrder}
            toggleSort={toggleSort}
          >
            Price
          </SortButton>
        </TableHead>
        <TableHead>
          <SortButton
            sortkey={SortKey.change}
            currentSorting={sortKey}
            sortDir={sortOrder}
            toggleSort={toggleSort}
          >
            24h Change
          </SortButton>
        </TableHead>
        <TableHead>
          <SortButton
            sortkey={SortKey.volume}
            currentSorting={sortKey}
            sortDir={sortOrder}
            toggleSort={toggleSort}
          >
            24h Volume
          </SortButton>
        </TableHead>
        <TableHead>
          <SortButton
            sortkey={SortKey.oi}
            currentSorting={sortKey}
            sortDir={sortOrder}
            toggleSort={toggleSort}
          >
            Open Interest
          </SortButton>
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

export function SortButton({
  sortkey,
  currentSorting,
  sortDir,
  toggleSort,
  children,
}: SortButtonProps): ReactElement {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 p-0 m-0 hover:bg-transparent"
      onClick={() => toggleSort(sortkey)}
    >
      {children}
      {sortkey === currentSorting ? (
        sortDir === Direction.asc ? (
          <ChevronUpIcon className="ml-2 h-4 w-4 text-white" />
        ) : (
          <ChevronDownIcon className="ml-2 h-4 w-4 text-white" />
        )
      ) : (
        <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}

interface SortButtonProps {
  sortkey: SortKey
  currentSorting: SortKey | null
  sortDir: Direction | null
  toggleSort: (key: SortKey) => void
  children: ReactNode
}
