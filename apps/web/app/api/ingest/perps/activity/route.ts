import crypto from 'node:crypto'
import {
  type AlchemyActivityEvent,
  type AlchemyNetwork,
  type AlchemyWebhookEvent,
  chainIdAlchemyNetwork,
} from '@opyn/alchemy'
import { opynConfig } from '@opyn/lib'
// import { tasks } from '@trigger.dev/sdk/v3'
import {
  getMarketByControllerAddress,
  updateUserMarketCollateral,
} from '@opyn/supabase'
import {
  type TablesInsert,
  createSupabaseServerClient,
  getUserMarketCollateral,
  insertUserMarketCollateral,
} from '@opyn/supabase'
// import { tasks } from '@trigger.dev/sdk/v3'
import { Alchemy, type Network } from 'alchemy-sdk'
import { NextResponse } from 'next/server'
import { arbitrumSepolia } from 'viem/chains'

// convert viem chains to alchemy networks
const networks: AlchemyNetwork[] = [arbitrumSepolia]
  .map((chain) => chainIdAlchemyNetwork[chain.id])
  .filter((network): network is AlchemyNetwork => network !== undefined)

export async function POST(req: Request) {
  console.log('✅ Alchemy Activity Webhook')
  const payload = await req.text()
  const evt = JSON.parse(payload) as AlchemyWebhookEvent
  const { network, activity } = evt.event as AlchemyActivityEvent
  console.log('✅ Alchemy Event', evt)
  if (
    !(await validateAlchemySignature(
      req,
      evt.webhookId,
      evt.event.network,
      payload,
    ))
  )
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (!isValidEvent(evt, network))
    return NextResponse.json({ error: 'Invalid event' }, { status: 400 })

  // TODO: move this to an atomic db function for robustnest
  const supabase = createSupabaseServerClient()
  const market = await getMarketByControllerAddress({
    controllerAddress: activity[0].toAddress,
    supabase,
  })
  console.log('✅ Market', market)
  const existingCollateral = await getUserMarketCollateral({
    marketId: market.id,
    address: activity[0].fromAddress,
    supabase,
  })
  console.log('✅ Existing collateral', existingCollateral)

  const collateral = {
    user_address: activity[0].fromAddress,
    market_id: market.id,
    balance: existingCollateral
      ? existingCollateral.balance + activity[0].value
      : activity[0].value,
  }

  if (!existingCollateral) {
    const insertedCollateral = await insertUserMarketCollateral({
      collateral,
      supabase,
    })
    console.log('✅ Inserted user market collateral', { insertedCollateral })
  } else {
    const updatedCollateral = await updateUserMarketCollateral({
      collateral,
      supabase,
    })
    console.log('✅ Updated user market collateral', { updatedCollateral })
  }

  // TODO: discuss this later
  // const result = await tasks.trigger('address-activity', evt)
  // console.info(`Triggered address activity event for webhook ${evt.id}`, result)

  console.log('✅ Webhook processed', evt.id, evt.event.network, evt)
  return NextResponse.json(
    { message: `Webhook ${evt.id} processed` },
    { status: 200 },
  )
}

function isValidEvent(
  evt: AlchemyWebhookEvent,
  network: AlchemyNetwork,
): boolean {
  const isAddressActivity = evt.type === 'ADDRESS_ACTIVITY'
  const isValidNetwork = networks.includes(network)
  if (!isAddressActivity || !isValidNetwork) {
    const errorMsg = !isAddressActivity
      ? `event type: ${evt.type}`
      : `network: ${network}`
    console.error(`Invalid: ${errorMsg}`)
    return false
  }
  return true
}

async function validateAlchemySignature(
  req: Request,
  webhookId: string,
  network: Network,
  payload: string,
): Promise<boolean> {
  const alchemySignature = req.headers.get('x-alchemy-signature')

  if (!alchemySignature) return false
  const settings = {
    authToken: opynConfig.alchemy.notifyToken,
    network,
  }

  const alchemy = new Alchemy(settings)
  const { webhooks } = await alchemy.notify.getAllWebhooks()
  const signingKey = webhooks.find(
    (webhook) => webhook.id === webhookId,
  )?.signingKey
  if (!signingKey) {
    console.error(`Webhook ${webhookId} not found`)
    return false
  }

  const hmac = crypto.createHmac('sha256', signingKey)
  hmac.update(payload)
  return alchemySignature === hmac.digest('hex')
}

const depositEventExample = {
  webhookId: 'wh_ylneag2h7lxap37q',
  id: 'whevt_mioyfrx3h6iddnf2',
  createdAt: '2024-11-25T01:37:45.730Z',
  type: 'ADDRESS_ACTIVITY',
  event: {
    network: 'ARB_SEPOLIA',
    activity: [
      {
        fromAddress: '0x51903a1964ec6b96f5eae3bbf1a5aa86e4a93294',
        toAddress: '0x822c287e1e07482ad33f833ae5e448fc51b67e49',
        blockNum: '0x5fa5d11',
        hash: '0x42a380d5a3bf62a3edcaab829e27279c97b9665ee34aca0adfd810d3da1cd028',
        value: 1000,
        asset: 'USDC',
        category: 'token',
        rawContract: {
          rawValue:
            '0x000000000000000000000000000000000000000000000000000000003b9aca00',
          address: '0x34f2fd40331487f0ef23215e3e8c0070557abc41',
          decimals: 6,
        },
        log: {
          blockHash:
            '0x0a834c777761fa0e701d128f71fc320c3c44826b0779416757e4a4f089a2f040',
          address: '0x34f2fd40331487f0ef23215e3e8c0070557abc41',
          logIndex: '0x2',
          data: '0x000000000000000000000000000000000000000000000000000000003b9aca00',
          removed: false,
          topics: [
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            '0x00000000000000000000000051903a1964ec6b96f5eae3bbf1a5aa86e4a93294',
            '0x000000000000000000000000822c287e1e07482ad33f833ae5e448fc51b67e49',
          ],
          blockNumber: '0x5fa5d11',
          transactionIndex: '0x2',
          transactionHash:
            '0x42a380d5a3bf62a3edcaab829e27279c97b9665ee34aca0adfd810d3da1cd028',
        },
      },
    ],
    source: 'chainlake-kafka',
  },
}
