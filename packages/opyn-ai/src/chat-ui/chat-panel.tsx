import * as React from 'react'

import { Card } from '@opyn/ui'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import { nanoid } from 'nanoid'

import { opynConfig } from '@opyn/lib'
import { cn } from '@opyn/ui'
import type { AI } from '../actions/create-ai'
import { UserMessage } from '../crypto-ui/message'
import { PromptForm } from './prompt-form'

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  scrollToLatestQuestion,
}: ChatPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  const shareChat = async () => {
    // Implement the shareChat functionality here
    console.log('Sharing chat...')
  }

  return (
    <div
      className={cn(
        'inset-x-0 bottom-0 w-full from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in bg-card',
        {
          'px-4 fixed pt-4': opynConfig.features.ai,
        },
      )}
    >
      {/* <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      /> */}
      <div className="mx-auto sm:max-w-2xl">
        {messages.length === 0 ? (
          <div className="mb-4 grid grid-cols-2 gap-2 px-0">
            {exampleMessages.map((example, index) => (
              <Card
                variant="outline"
                key={example.heading}
                className={'cursor-pointer'}
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>,
                    },
                  ])

                  const responseMessage = await submitUserMessage({
                    content: example.message,
                  })

                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ])
                }}
              >
                <div className="text-sm text-white font-semibold">
                  {example.heading}
                </div>
                <div className="text-sm ">{example.subheading}</div>
              </Card>
            ))}
          </div>
        ) : null}

        {/* {messages?.length >= 2 ? (
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages,
                    }}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : null} */}

        <div className="bottom-0">
          <PromptForm
            input={input}
            setInput={setInput}
            scrollToLatestQuestion={scrollToLatestQuestion}
          />
          <div className="text-neutral-light text-xs text-center py-2">
            Experimental: Not financial advice
          </div>
        </div>
      </div>
    </div>
  )
}

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  scrollToLatestQuestion: () => void
}

const exampleMessages = [
  {
    heading: 'Power Perps',
    subheading: 'describe them',
    message: 'How do power perps work? Compare them.',
  },
  {
    heading: '0-Perps',
    subheading: 'describe how they work',
    message: 'How do 0-perps work?',
  },
  {
    heading: 'How to price',
    subheading: 'power perpetuals?',
    message: 'How to price power perpetuals?',
  },
  {
    heading: 'Price',
    subheading: 'of Doge.',
    message: "What's the current price of Doge?",
  },

  // {
  //   heading: 'Variance swap',
  //   subheading: 'payoff structure?',
  //   message: 'What is the payoff of a variance swap?',
  // },
  // {
  //   heading: 'Arbitrage',
  //   subheading: 'in power perpetuals',
  //   message: 'How does arbitrage work in power perpetuals?',
  // },

  {
    heading: 'Treding memecoins',
    subheading: 'today',
    message: 'What are the trending memecoins today?',
  },
  // {
  //   heading: 'Technical Analysis',
  //   subheading: 'on current pair',
  //   message: '/ta',
  // },
  // {
  //   heading: 'What is the price of',
  //   subheading: '$DOGE right now?',
  //   message: 'What is the price of $DOGE right now?',
  // },
  {
    heading: 'I would like to long',
    subheading: '$DOGE',
    message: 'I would like to long 42 $DOGE',
  },
  // {
  //   heading: 'What are some',
  //   subheading: 'recent events about $DOGE?',
  //   message: 'What are some recent events about $DOGE?',
  // },
]
