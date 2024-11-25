import { getMarkets } from '@/Users/gaboesquivel/Code/opyn/packages/opyn-supabase/src/api/market/index'
import { createSupabaseServerClient } from '@opyn/supabase'
import { Alchemy, Network, WebhookType } from 'alchemy-sdk'

async function createAddressActivityNotification({
  addresses,
  network,
}: { addresses: string[]; network: Network }) {
  try {
    const settings = {
      authToken: process.env.ALCHEMY_NOTIFY_TOKEN || '',
      network,
    }

    const alchemy = new Alchemy(settings)
    const addressActivityWebhook = await alchemy.notify.createWebhook(
      'https://opyn-app.vercel.app/api/ingest/perps/activity',
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

  const depositAddresses = markets.map((market) => ({
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
