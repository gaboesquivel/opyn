'use client'

import { Button } from '@opyn/ui'
import { Card, CardContent } from '@opyn/ui'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ScrollArea,
  Separator,
} from '@opyn/ui'
import { ChevronDown, Plus } from 'lucide-react'
import { useState } from 'react'

export default function AdvancedTradingSidebar() {
  const [cards, setCards] = useState<number[]>([])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollArea className="h-screen">
        <div className="p-4 space-y-4 max-w-md mx-auto">
          {/* Transactions Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Transactions</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCards((prev) => [...prev, prev.length + 1])}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Deposits */}
          <div className="space-y-2">
            {cards.map((i) => (
              <Card key={i} className="bg-muted/50">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Deposit</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">USDC Collateral</div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Asset</span>
                      <span>ETH-FLO</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Size</span>
                      <span>30000.00 USDC</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current</span>
                      <span>$2,000.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Buy Section */}
          <Card className="bg-muted/50">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Buy</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">1 Perp</span>
                  <span className="text-xs text-emerald-500">Long</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Size</span>
                  <span className="text-emerald-500">Long</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Max Slippage</span>
                  <span>2.5%</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Price Impact</span>
                  <span>TBD</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Est. Fees</span>
                  <span>$4.87</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Value</span>
                  <span>$2,000.00</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Asset Leverage</span>
                  <span>2.5x</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Health Changes */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between">
              <span className="text-sm font-medium">
                Account Health Changes
              </span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Liquidation price (long)</span>
                  <div className="flex items-center gap-2">
                    <span>$800.00</span>
                    <span>→</span>
                    <span>$1,300.00</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Liquidation price (short)</span>
                  <div className="flex items-center gap-2">
                    <span>$2,100.00</span>
                    <span>→</span>
                    <span>$2,100.00</span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Summary */}
          <Collapsible>
            <CollapsibleTrigger className="flex w-full items-center justify-between">
              <span className="text-sm font-medium">Summary</span>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Number keys</span>
                  <span>2</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Est. gas</span>
                  <span>$12.38</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Est. price impact</span>
                  <span>1.14%</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Est. fees</span>
                  <span>$5.49</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Separator className="my-4" />

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              Reset changes
            </Button>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
              Execute 2 transactions
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
