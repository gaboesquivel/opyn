// 'use client'

// import { Badge } from '@opyn/ui'
// import { Card, CardContent, CardHeader, CardTitle } from '@opyn/ui'
// import { ScrollArea } from '@opyn/ui'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@opyn/ui'
// import {
//   ChevronDown,
//   ChevronUp,
//   CircleDollarSign,
//   TrendingUp,
// } from 'lucide-react'
// import { useEffect, useState } from 'react'
// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from 'recharts'

// type ChartDataPoint = {
//   time: string
//   value: number
// }

// type Strategy = {
//   name: string
//   positions: number
//   trend: 'up' | 'down'
// }

// const initialChartData: ChartDataPoint[] = [
//   { time: '1:00', value: 21000 },
//   { time: '2:00', value: 22000 },
//   { time: '3:00', value: 23000 },
//   { time: '4:00', value: 24000 },
//   { time: '5:00', value: 23500 },
// ]

// const initialStrategies: Strategy[] = [
//   { name: 'Crab', positions: 2, trend: 'up' },
//   { name: 'Anti-Crab', positions: 2, trend: 'down' },
//   { name: 'Zen Bull', positions: 3, trend: 'up' },
// ]

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-background p-2 border border-border rounded-md">
//         <p className="text-sm">{`Time: ${label}`}</p>
//         <p className="text-sm text-primary">{`Value: $${payload[0].value}`}</p>
//       </div>
//     )
//   }
//   return null
// }

// export default function TradingDashboard() {
//   const [chartData, setChartData] = useState<ChartDataPoint[]>([])
//   const [strategies, setStrategies] = useState<Strategy[]>([])

//   useEffect(() => {
//     // Simulate data fetching
//     setChartData(initialChartData)
//     setStrategies(initialStrategies)
//   }, [])

//   return (
//     <div className="flex flex-col gap-4 p-4 bg-background text-foreground min-h-screen">
//       <div className="flex items-center gap-2 mb-4">
//         <Badge variant="outline" className="text-sm">
//           Simulated Portfolio
//         </Badge>
//         <span className="text-sm text-muted-foreground">
//           This is a simulated view of your account based on the queued
//           transactions
//         </span>
//       </div>

//       <div className="flex items-center gap-2 mb-6">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
//             <CircleDollarSign className="w-4 h-4" />
//           </div>
//           <div>
//             <h2 className="font-semibold">ETH-USDC</h2>
//             <p className="text-sm text-muted-foreground">No positions</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-4 md:grid-cols-3 mb-6">
//         {strategies.map((strategy) => (
//           <Card key={strategy.name} className="bg-card">
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="font-medium">{strategy.name}</h3>
//                   <p className="text-sm text-muted-foreground">
//                     {strategy.positions} positions
//                   </p>
//                 </div>
//                 <div className="w-12 h-12">
//                   {strategy.trend === 'up' ? (
//                     <TrendingUp className="w-6 h-6 text-green-500" />
//                   ) : (
//                     <TrendingUp className="w-6 h-6 text-red-500 transform rotate-180" />
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Market Portfolio Value</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[300px]">
//             {chartData.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={chartData}>
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     className="stroke-muted"
//                   />
//                   <XAxis dataKey="time" />
//                   <YAxis />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke="hsl(var(--primary))"
//                     dot={false}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <p className="text-muted-foreground">Loading chart data...</p>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Market Portfolio</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ScrollArea className="h-[300px]">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Position</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Value</TableHead>
//                   <TableHead>Change</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 <TableRow>
//                   <TableCell>1 Perp</TableCell>
//                   <TableCell>
//                     <Badge variant="outline">Long</Badge>
//                   </TableCell>
//                   <TableCell>$3,580.09</TableCell>
//                   <TableCell className="text-green-500">
//                     <div className="flex items-center gap-1">
//                       <ChevronUp className="w-4 h-4" />
//                       2.5%
//                     </div>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>2 Perp</TableCell>
//                   <TableCell>
//                     <Badge variant="outline">Short</Badge>
//                   </TableCell>
//                   <TableCell>$3,580.09</TableCell>
//                   <TableCell className="text-red-500">
//                     <div className="flex items-center gap-1">
//                       <ChevronDown className="w-4 h-4" />
//                       1.2%
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </ScrollArea>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
export {}
