'use client'

import {
  OnePerpIcon,
  TwoPerpIcon,
  ZeroDotFivePerpIcon,
} from '@/components/shared/icons'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useQueryState } from 'nuqs'

export function PerpTypeButtons() {
  const [perp, setPerp] = useQueryState<'0.5' | '1' | '2'>('perp', {
    defaultValue: '1',
    parse: (value) => value as '0.5' | '1' | '2',
  })

  return (
    <Tabs
      value={perp}
      onValueChange={(value) => setPerp(value as '0.5' | '1' | '2')}
      className="mb-1 sm:mb-2"
    >
      <TabsList className="grid w-full grid-cols-3 bg-secondary/40">
        {[
          { value: '0.5', icon: ZeroDotFivePerpIcon },
          { value: '1', icon: OnePerpIcon },
          { value: '2', icon: TwoPerpIcon },
        ].map(({ value, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="data-[state=active]:bg-accent"
          >
            <span
              className={cn(
                'text-transparent data-[state=active]:text-secondary',
                perp === value ? 'text-secondary ' : 'text-transparent',
              )}
            >
              <Icon stroke={perp === value ? 'white' : '#CFD1D3'} />
            </span>
            <span className="ml-2">{value} Perp</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
