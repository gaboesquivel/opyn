'use client'

import { Badge } from '@opyn/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@opyn/ui'
import { Button } from '@opyn/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@opyn/ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@opyn/ui'
import {
  ArrowUpDown,
  LineChart as ChartIcon,
  ChevronDown,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

// Sample price data
const priceData = [
  { price: 1500, value: 22000, secondValue: 21000 },
  { price: 2000, value: 23000, secondValue: 22000 },
  { price: 2500, value: 24000, secondValue: 23000 },
  { price: 3000, value: 23500, secondValue: 24000 },
  { price: 3500, value: 24500, secondValue: 23500 },
  { price: 4000, value: 25000, secondValue: 24500 },
]

export default function AdvancedTradingPanel() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <ChevronDown className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold">ETH-USDC</h2>
            <p className="text-sm text-muted-foreground">Advanced Trade</p>
          </div>
        </div>
      </div>

      {/* Trading Strategies */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        <Card className="flex-1 min-w-[200px]">
          <CardContent className="p-4 flex items-center gap-4">
            <ChartIcon className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-medium">Crab</h3>
              <p className="text-sm text-muted-foreground">2 positions</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[200px]">
          <CardContent className="p-4 flex items-center gap-4">
            <TrendingDown className="w-8 h-8 text-red-500" />
            <div>
              <h3 className="font-medium">Anti-Crab</h3>
              <p className="text-sm text-muted-foreground">2 positions</p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[200px]">
          <CardContent className="p-4 flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-medium">Zen Bull</h3>
              <p className="text-sm text-muted-foreground">3 positions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Portfolio Value */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Market Portfolio Value</CardTitle>
          <div className="text-2xl font-bold">$0.00</div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <XAxis dataKey="price" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="secondValue"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4 text-sm text-muted-foreground">
            <div>$1,500</div>
            <div>$2,000</div>
            <div>$2,500</div>
            <div>$3,000</div>
            <div>$3,500</div>
            <div>$4,000</div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Details */}
      <Card>
        <CardHeader>
          <CardTitle>Market Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="perps" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="perps">Perps</TabsTrigger>
              <TabsTrigger value="vaults">Vaults</TabsTrigger>
              <TabsTrigger value="collateral">Collateral</TabsTrigger>
            </TabsList>
            <TabsContent value="perps">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Total Position Value</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge variant="secondary">1 Perp Long</Badge>
                    </TableCell>
                    <TableCell>19:1</TableCell>
                    <TableCell>$1,585.00</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="destructive">2 Perp Short</Badge>
                    </TableCell>
                    <TableCell>19:1</TableCell>
                    <TableCell>$1,585.00</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="vaults">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Total Position Value</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline">Fix - Stable</Badge>
                    </TableCell>
                    <TableCell>580.00</TableCell>
                    <TableCell>$1,585.00</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="collateral">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Total Value</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline">UniLP</Badge>
                    </TableCell>
                    <TableCell>19:1</TableCell>
                    <TableCell>$1,585.00</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Badge variant="outline">ETH</Badge>
                    </TableCell>
                    <TableCell>19:1</TableCell>
                    <TableCell>$1,585.00</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="fixed bottom-4 right-4">
        <Button variant="destructive">Close all positions</Button>
      </div>
    </div>
  )
}
