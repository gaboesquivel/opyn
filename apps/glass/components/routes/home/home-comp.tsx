'use client'

import { opynAbis } from '@opyn/core'
import { useMarket } from '@opyn/hooks'
import { useExecute } from '@opyn/hooks'

export function HomeComp() {
  const { data } = useExecute('0x0000000000000000000000000000000000000000')
  const { marketId } = useMarket()
  console.log(data)
  console.log(marketId)
  return <div>HomeComp</div>
}
