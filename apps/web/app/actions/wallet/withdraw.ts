'use server'

import { type ActionResult, failure, success } from '@/lib/actions'
import { createSupabaseServerClient } from '@/services/supabase'
import type { Tables } from '@opyn/supabase'
import { createSafeActionClient } from 'next-safe-action'
import {
  http,
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
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
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
    }): Promise<ActionResult<Tables<'transactions'>>> => {
      try {
        const supabase = await createSupabaseServerClient()
        const normalizedAddress = getAddress(address)
        const parsedAmount = parseEther(amount)

        // Call the token contract to mint tokens
        const hash = await walletClient.sendTransaction({
          to: getAddress(normalizedAddress),
          value: parsedAmount,
        })

        if (transaction.error)
          return failure('DB_OP_FAILURE', transaction.error)

        return success(transaction.data)
      } catch (error) {
        return failure('UNEXPECTED_ERROR', error)
      }
    },
  )
