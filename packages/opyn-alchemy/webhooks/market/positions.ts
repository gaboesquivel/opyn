import { createSupabaseServerClient, getMarkets } from '@opyn/supabase'
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
      'https://opyn-app.vercel.app/api/ingest/market/positions',
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

  const positionAddresses = markets
    .map((market) => ({
      long_address: market.two_perp_long,
      short_address: market.two_perp_short,
      chain_id: '421614',
      network: Network.ARB_SEPOLIA,
      market_label: market.label,
    }))
    .filter((market): market is NonNullable<typeof market> => {
      if (!market.long_address || !market.short_address) {
        console.warn(
          `Missing position addresses for market ${market.market_label}`,
        )
        return false
      }
      return true
    })

  console.log('🚀 Creating position activity webhooks...')
  for (const {
    long_address,
    short_address,
    network,
    market_label,
  } of positionAddresses) {
    console.log(`Market: ${market_label}`)
    console.log(`  Long Position: ${long_address}`)
    console.log(`  Short Position: ${short_address}`)
    if (!long_address || !short_address) {
      console.warn(`Missing position addresses for market ${market_label}`)
      continue
    }

    await createAddressActivityNotification({
      addresses: [long_address, short_address], // all strategies erc20 tokens events. mint, burn, transfer
      network,
    })
    console.log(`✅ Created webhook for ${market_label}`)
  }

  console.log('\n🎉 All position webhooks created successfully!')
}

main().catch((error) => {
  console.error('Failed to create position webhooks:', error)
  process.exit(1)
})
