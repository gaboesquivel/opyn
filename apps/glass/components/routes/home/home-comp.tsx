'use client'

// import { opynAbis } from '@opyn/core'
import { useMarket } from '@opyn/hooks'
import { useExecute } from '@opyn/hooks'
// import { useDevtools } from '@opyn/hooks'
import { Button } from '@opyn/ui'

export function HomeComp() {
  const { data } = useExecute('0x0000000000000000000000000000000000000000')
  const { marketId } = useMarket()
  console.log(data)
  console.log(marketId)
  // console.log(opynAbis)
  return (
    <div>
      <p className="text-2xl">HomeComp</p>
      <Button variant="up">Click me</Button>
    </div>
  )
}
