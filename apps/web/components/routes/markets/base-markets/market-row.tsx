import { TableCell, TableRow } from "@/components/ui/table"
import { SparkChart } from "../spark-chart"

interface MarketRowProps {
  icon: string
  name: string
  markets: string
  price: string
  change: string
  volume: string
  oi: string
  data: { value: number }[]
  trend: "up" | "down"
}

export function MarketRow({
  icon,
  name,
  markets,
  price,
  change,
  volume,
  oi,
  data,
  trend,
}: MarketRowProps) {
  return (
    <TableRow className="group transition-colors hover:bg-gray-900">
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
            <div className="text-sm text-gray-400">{markets} {+markets > 1 ? "markets" : "market"}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="w-[120px] px-4 py-4">
        <div className="w-[100px]">
          <SparkChart data={data} trend={trend} />
        </div>
      </TableCell>
      <TableCell className="px-4 py-4 font-medium tabular-nums">{price}</TableCell>
      <TableCell className={`px-4 py-4 font-medium tabular-nums ${trend === "up" ? "text-success-500" : "text-error-500"}`}>
        {change}
      </TableCell>
      <TableCell className="px-4 py-4 font-medium tabular-nums">{volume}</TableCell>
      <TableCell className="px-4 py-4 font-medium tabular-nums">{oi}</TableCell>
    </TableRow>
  )
}

