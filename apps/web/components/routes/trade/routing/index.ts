import { z } from 'zod'

export * from './routing.types'

export const tradeRouteParamsSchema = z.object({
  pair: z.string().regex(/^[A-Z]{3,4}[A-Z]{3,4}$/), // TODO: validate currency pair
  trade: z.enum(['perps', 'spot', 'vaults']),
})

export function validateTradeRouteParams(
  params: unknown,
): z.infer<typeof tradeRouteParamsSchema> {
  return tradeRouteParamsSchema.parse(params)
}
