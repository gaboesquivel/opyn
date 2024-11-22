import { Alchemy, Network } from 'alchemy-sdk'
import { groupBy } from 'lodash'
import { appConfig } from '../src/config'

const settings = {
  authToken: appConfig.alchemyNotifyToken,
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
