import { createInterface } from 'node:readline'
import { Alchemy, Network } from 'alchemy-sdk'
async function deleteAllWebhooks(network: Network) {
  try {
    const settings = {
      authToken: process.env.ALCHEMY_NOTIFY_TOKEN || '',
      network,
    }

    const alchemy = new Alchemy(settings)
    const response = await alchemy.notify.getAllWebhooks()
    const webhooks = response.webhooks

    console.log(`Found ${webhooks.length} webhooks on ${network}:`)
    for (const webhook of webhooks) {
      console.log(`- ${webhook.url} (${webhook.id})`)
    }

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const answer = await new Promise<string>((resolve) => {
      rl.question('Do you want to delete all webhooks? (y/N) ', resolve)
    })

    rl.close()

    if (answer.toLowerCase() !== 'y') {
      console.log('Operation cancelled')
      return
    }

    console.log('Deleting webhooks...')
    for (const webhook of webhooks) {
      await alchemy.notify.deleteWebhook(webhook.id)
      console.log(`Deleted webhook ${webhook.id}`)
    }

    console.log('All webhooks deleted successfully')
  } catch (error) {
    console.error('Failed to delete webhooks:', error)
  }
}

async function main() {
  const networks = [Network.ARB_SEPOLIA]

  for (const network of networks) {
    console.log(`\nProcessing network: ${network}`)
    await deleteAllWebhooks(network)
  }
}

main()
