'use server'

import { type ActionResult, failure, success } from '@opyn/lib'
import { createSupabaseNextClient } from '@opyn/supabase'
import type { Tables } from '@opyn/supabase'
import { createSafeActionClient } from 'next-safe-action'
import {
  http,
  Address,
  type Hex,
  createPublicClient,
  createWalletClient,
  getAddress,
  parseEther,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import { z } from 'zod'

const withdrawSchema = z.object({
  address: z.string(),
  amount: z.string(),
})

// Initialize wallet client with private key
const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex)
const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(),
})

export const issueTokens = createSafeActionClient()
  .schema(withdrawSchema)
  .action(
    async ({
      parsedInput: { address, amount },
    }): Promise<ActionResult<{ hash: Hex }>> => {
      try {
        const supabase = await createSupabaseNextClient()
        const normalizedAddress = getAddress(address)
        const parsedAmount = parseEther(amount)

        // Call the token contract to mint tokens
        const hash = await walletClient.sendTransaction({
          to: getAddress(normalizedAddress),
          value: parsedAmount,
        })

        if (!hash)
          return failure('TRX_OP_FAILURE', 'Failed to send transaction')

        return success({ hash })
      } catch (error) {
        return failure('UNEXPECTED_ERROR', error)
      }
    },
  )
