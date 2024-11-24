import { Alchemy, Network, WebhookType } from 'alchemy-sdk'
import { opynConfig } from '../src/config'

async function createAddressActivityNotification({
  addresses,
  network,
}: { addresses: string[]; network: Network }) {
  console.log('🚀 createAddressActivityNotification', addresses, network)
  try {
    const settings = {
      authToken: opynConfig.alchemyNotifyToken,
      network,
    }

    const alchemy = new Alchemy(settings)
    const addressActivityWebhook = await alchemy.notify.createWebhook(
      'https://opyn-app.vercel.app/api/activity',
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

const depositAddresses = [
  {
    // USDT Testnet Token
    deposit_address: '0x9aeFa354353387020028CA5b306ff1AFC361E3fd',
    chain_id: '421614',
    network: Network.ARB_SEPOLIA,
  },
]

for (const { deposit_address, network } of depositAddresses) {
  createAddressActivityNotification({
    addresses: [deposit_address],
    network,
  })
}
