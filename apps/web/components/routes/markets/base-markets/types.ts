import type { Direction, SortKey } from './table/table.types'

export interface MarekstPageProps {
  searchParams: MarketsPageSearchParams
}

export interface MarketsPageSearchParams {
  sortBy: SortKey
  order: Direction
  query: string
}
