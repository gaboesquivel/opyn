import { Alchemy, Network } from 'alchemy-sdk'
import { groupBy } from 'lodash'

const settings = {
  authToken: process.env.ALCHEMY_NOTIFY_TOKEN || '',
  network: Network.ARB_SEPOLIA, // Adjust the network as needed
}

const alchemy = new Alchemy(settings)

export async function getAlchemyWebhooks() {
  try {
    const { webhooks } = await alchemy.notify.getAllWebhooks()

    const groupedWebhooks = groupBy(webhooks, 'url')
    return groupedWebhooks
  } catch (error) {
    console.error('Failed to fetch webhooks:', error)
  }
}
