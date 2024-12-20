import 'server-only'

import {
  formatCurrency,
  nanoid,
  runAsyncFnWithoutBlocking,
  sleep,
} from '@opyn/lib'
import { createStreamableUI, getMutableAIState } from 'ai/rsc'
import { SystemMessage, spinner } from '../crypto-ui'
import type { AI } from './create-ai'

export async function confirmPurchase(
  symbol: string,
  price: number,
  amount: number,
) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>,
  )

  const systemMessage = createStreamableUI(null)

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000)

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>,
    )

    await sleep(1000)

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{' '}
          {formatCurrency({ value: amount * price })}
        </p>
      </div>,
    )

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} coins of {symbol} at ${price}. Total cost ={' '}
        {formatCurrency({ value: amount * price })}.
      </SystemMessage>,
    )

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: 'system',
          content: `[User has purchased ${amount} coins of ${symbol} at ${price}. Total cost = ${
            amount * price
          }]`,
        },
      ],
    })
  })

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value,
    },
  }
}
