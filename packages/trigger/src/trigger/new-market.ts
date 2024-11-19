import type { AlchemyActivity, AlchemyWebhookEvent } from '@opyn/alchemy'
import { logger, task } from '@trigger.dev/sdk/v3'
import { insertMarket } from '../lib/supabase'

export const newMarketTask = task({
  id: 'new-market',
  run: async (payload: AlchemyWebhookEvent) => {
    const activity: AlchemyActivity[] = payload.event.activity
    console.log(activity)

    // Insert dummy market data for testing
    const dummyMarket = {
      base_asset: '123e4567-e89b-12d3-a456-426614174000', // Example UUID for base token
      quote_asset: '987fcdeb-89ab-12d3-a456-426614174000', // Example UUID for quote token
      id: '123e4567-e89b-12d3-a456-426614174000',
      label: 'ETH-USDC',
      owner: '0x1234567890123456789012345678901234567890',
      chain_id: 11155111, // Sepolia testnet
    }

    try {
      const market = await insertMarket({ market: dummyMarket })
      logger.info('Inserted dummy market', { market })
    } catch (error) {
      logger.error('Failed to insert dummy market', { error })
    }
  },
})
