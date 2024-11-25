import { createSupabaseServerClient } from '@opyn/supabase'
import { getMarkets } from '@opyn/supabase'
import { Alchemy, Network, WebhookType } from 'alchemy-sdk'

import './wipe'

async function createAddressActivityNotification({
  addresses,
  network,
}: { addresses: string[]; network: Network }) {
  console.log('🚀 createAddressActivityNotification', addresses, network)
  try {
    const settings = {
      authToken: process.env.ALCHEMY_NOTIFY_TOKEN || '',
      network,
    }

    const alchemy = new Alchemy(settings)
    const addressActivityWebhook = await alchemy.notify.createWebhook(
      'https://e1a8-186-64-220-101.ngrok-free.app/api/ingest/perps/activity',
      WebhookType.ADDRESS_ACTIVITY,
      {
        addresses,
        network,
      },
    )

    console.log('Address Activity Webhook Details:')
    console.log(JSON.stringify(addressActivityWebhook, null, 2))
  } catch (error) {
    console.error(
      'Failed to create address activity notification for network:',
      network,
      error,
    )
  }
}

async function main() {
  const supabase = await createSupabaseServerClient()
  const markets = await getMarkets({ supabase, marketType: 'perps' })

  const depositAddresses = markets.slice(0, 5).map((market) => ({
    deposit_address: market.controller,
    chain_id: '421614',
    network: Network.ARB_SEPOLIA,
    market_label: market.label,
  }))

  console.log('🚀 Activity Hooks')
  for (const { deposit_address, network, market_label } of depositAddresses) {
    console.log(deposit_address, market_label)

    createAddressActivityNotification({
      addresses: [deposit_address],
      network,
    })
  }
}

main()
