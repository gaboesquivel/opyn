'use client'

import {Button} from '@/components/ui/button'
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from '@/components/ui/table'
import {ChevronUpIcon, ChevronDownIcon, ChevronsUpDownIcon, LoaderIcon} from 'lucide-react'
import {MarketRow} from '@/components/routes/markets/base-markets/table/market-row'
import {parseAsStringEnum, useQueryState} from 'nuqs'
import {ReactElement, ReactNode, useMemo} from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAggregatedMarketMetrics, useSupabaseClient } from '@/services/supabase'
import { MarketRowDataProps } from './table.types'

const generateData = (points: number, trend: "up" | "down") =>
    Array.from({length: points}, (_, i) => ({
        value: trend === "up"
            ? 50 + Math.random() * 50 + i
            : 100 - (Math.random() * 50 + i)
    }))

enum SortKey { name = "name", price = "price", change = "change", volume = "total_volume_24h", oi = "total_open_interest" }

enum Direction {
    asc = "ASC",
    desc = "DESC"
}

export function MarketsTable() {

    const supabase = useSupabaseClient()

    const [sortKey, setSortKey] = useQueryState("sortBy", parseAsStringEnum<SortKey>(Object.values(SortKey) as SortKey[]))

    const [sortOrder, setSortOrder] = useQueryState("order", parseAsStringEnum<Direction>(Object.values(Direction) as Direction[]))

    const { data, isLoading } = useQuery({
        queryKey: ["markets-table", sortKey, sortOrder],
        queryFn: ()=>getAggregatedMarketMetrics({
            sortField: (sortKey === SortKey.volume || sortKey === SortKey.oi) ? sortKey : "num_markets",
            sortDirection: sortOrder as 'ASC' | 'DESC',
            supabase
        })
    })
    // 

    const marketData = useMemo<MarketRowDataProps[]>(() => {
        return (data?.map((item: {[key: string]: any})=>(
            {
                icon: item?.underlier_asset_image_url,
                name: item?.underlier_asset_name,
                markets: item?.num_markets,
                price: 3000.00,
                change: 5.83,
                volume: item?.total_volume_24h,
                oi: item?.total_open_interest,
                data: generateData(20, "up"),
                trend: "up",
            }
        )) || [])
    }, [data])

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
                        <SortButton sortkey={SortKey.price} currentSorting={sortKey} sortDir={sortOrder}
                                    toggleSort={toggleSort}>
                            Price
                        </SortButton>
                    </TableHead>
                    <TableHead>
                        <SortButton sortkey={SortKey.change} currentSorting={sortKey} sortDir={sortOrder}
                                    toggleSort={toggleSort}>
                            24h Change
                        </SortButton>
                    </TableHead>
                    <TableHead>
                        <SortButton sortkey={SortKey.volume} currentSorting={sortKey} sortDir={sortOrder}
                                    toggleSort={toggleSort}>
                            24h Volume
                        </SortButton>
                    </TableHead>
                    <TableHead>
                        <SortButton sortkey={SortKey.oi} currentSorting={sortKey} sortDir={sortOrder} toggleSort={toggleSort}>
                            Open Interest
                        </SortButton>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { isLoading ? 
                    (<TableRow>
                        <TableCell colSpan={6} className='p-4 text-center'>
                            <div className='flex w-full items-center justify-center'>
                         <LoaderIcon className='animate-spin text-tertiary' />
                            </div>
                        </TableCell>
                    </TableRow>) :
                    marketData.map((market, index) => (
                        <MarketRow
                            key={index}
                            icon={market.icon}
                            name={market.name}
                            markets={market.markets}
                            price={`$${(+market.price).toFixed(2)}`}
                            change={`${+market.change > 0 ? '+' : ''}${(+market.change).toFixed(2)}%`}
                            volume={`$${market.volume}m`}
                            oi={`$${market.oi}m`}
                            data={market.data}
                            trend={market.trend as ('up' | 'down')}
                        />
                ))}
            </TableBody>
        </Table>
    )
}

interface SortButtonProps {
    sortkey: SortKey,
    currentSorting: SortKey | null,
    sortDir: Direction | null,
    toggleSort: (key: SortKey) => void,
    children: ReactNode
}

export function SortButton({sortkey, currentSorting, sortDir, toggleSort, children}: SortButtonProps): ReactElement {

    return (
        <Button variant="ghost" size="sm" className="h-8 p-0 m-0 hover:bg-transparent"
                onClick={() => toggleSort(sortkey)}>
            {children}
            {sortkey === currentSorting ?
                (sortDir === Direction.asc ?
                    <ChevronUpIcon className="ml-2 h-4 w-4 text-white"/> :
                    <ChevronDownIcon className="ml-2 h-4 w-4 text-white"/>) :
                <ChevronsUpDownIcon className="ml-2 h-4 w-4"/>
            }
        </Button>
    )
}