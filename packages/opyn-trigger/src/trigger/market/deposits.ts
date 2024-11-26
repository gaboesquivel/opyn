import type { AlchemyActivity, AlchemyWebhookEvent } from '@opyn/alchemy'
import {
  createSupabaseServerClient,
  getUserMarketCollateral,
} from '@opyn/supabase'
import { logger, task } from '@trigger.dev/sdk/v3'
import {
  getMarketByControllerAddress,
  insertUserMarketCollateral,
} from '../../supabase'

export const perpDepositTask = task({
  id: 'perp-deposit',
  run: async (payload: AlchemyWebhookEvent) => {
    const activity: AlchemyActivity[] = payload.event.activity
    console.log(activity)

    try {
      const supabase = createSupabaseServerClient()
      const market = await getMarketByControllerAddress({
        controllerAddress: activity[0].toAddress,
      })
      const existingCollateral = await getUserMarketCollateral({
        marketId: market.id,
        address: activity[0].fromAddress,
        supabase,
      })

      const collateral = {
        user_address: activity[0].fromAddress,
        market_id: market.id,
        collateral_amount: activity[0].value,
      }
      await insertUserMarketCollateral({ collateral })
      console.log('Inserted user market collateral', { collateral })
    } catch (error) {
      logger.error('Failed to insert user market collateral', { error })
    }
  },
})
