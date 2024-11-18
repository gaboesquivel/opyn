import { Card } from '@/components/ui/card'
import { appConfig } from '@/lib/config'
import { cn, nanoid } from '@/lib/utils'
import { AI, getMissingKeys } from './actions/create-ai'
import { Chat } from './chat-ui'

export async function OpynAi() {
  const id = nanoid()
  const missingKeys = await getMissingKeys()

  return (
    <Card variant="padded" className={cn('h-full pt-4')}>
      <AI initialAIState={{ chatId: id, messages: [] }}>
        <Chat id={id} missingKeys={missingKeys} />
      </AI>
    </Card>
  )
}
