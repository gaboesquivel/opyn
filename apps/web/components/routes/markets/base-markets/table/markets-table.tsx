import { Table } from '@opyn/ui'
import type { MarketsPageSearchParams } from '../types'
import MarketTableHeader from './market-table-header'
import { MarketTableBody } from './markets-table-body'

export function MarketsTable({
  searchParams,
}: { searchParams: MarketsPageSearchParams }) {
  return (
    <Table>
      <MarketTableHeader />
      <MarketTableBody searchParams={searchParams} />
    </Table>
  )
}
