import type { MarketRowDataProps } from '@/components/routes/markets/base-markets/table/table.types'
import { formatCurrency } from '@opyn/lib'
import { TableCell, TableRow } from '@opyn/ui'
import { SparkChart } from '../../spark-chart'

export function MarketRow({
  key,
  icon,
  name,
  markets,
  price,
  change,
  volume,
  oi,
  data,
  trend,
}: MarketRowDataProps & { key: string | number }) {
  return (
    <TableRow
      key={key}
      className="group transition-colors hover:bg-gray-900 hover:cursor-pointer"
    >
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <img
            src={icon}
            alt={name}
            width={24}
            height={24}
            className="rounded-full bg-gray-200 object-center object-contain"
          />
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-400">
              {markets} {+markets > 1 ? 'markets' : 'market'}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="w-[120px] px-4 py-4">
        <div className="w-[100px]">
          <SparkChart data={data} trend={trend} />
        </div>
      </TableCell>
      <TableCell className="px-4 py-4 font-medium tabular-nums">
        {formatCurrency({
          value: price,
        })}
      </TableCell>
      <TableCell
        className={`px-4 py-4 font-medium tabular-nums ${trend === 'up' ? 'text-success-500' : 'text-error-500'}`}
      >
        {`${change > 0 ? '+' : ''}${(change).toFixed(2)}%`}
      </TableCell>
      <TableCell className="px-4 py-4 font-medium tabular-nums">
        {formatCurrency({
          value: volume,
        })}
      </TableCell>
      <TableCell className="px-4 py-4 font-medium tabular-nums">
        {formatCurrency({
          value: oi,
        })}
      </TableCell>
    </TableRow>
  )
}
