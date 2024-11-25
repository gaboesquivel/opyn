'use server'

import { type ActionResult, failure, success } from '@opyn/lib'
import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'

const schema = z.object({
  url: z.string().url(),
  slug: z.string().optional(),
})

export const generateShortLink = createSafeActionClient()
  .schema(schema)
  .action(
    async ({
      parsedInput: { url, slug },
    }): Promise<ActionResult<DubShareLinkResponse>> => {
      try {
        const response = await fetch(
          `https://api.dub.co/links?workspaceId=${process.env.DUB_WORKSPACE_ID}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.DUB_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              domain: 'getopyn.link',
              url,
              ...(slug && { slug }),
            }),
          },
        )

        if (!response.ok) {
          const error = await response.json()
          return failure('UNEXPECTED_ERROR', error)
        }

        const data = await response.json()
        const linkData = {
          key: data.key,
          shortLink: data.shortLink,
          qrCode: data.qrCode,
        }
        return success(linkData)
      } catch (error) {
        return failure('UNEXPECTED_ERROR', error)
      }
    },
  )

export interface DubShareLinkResponse {
  key: string
  shortLink: string
  qrCode: string
}
