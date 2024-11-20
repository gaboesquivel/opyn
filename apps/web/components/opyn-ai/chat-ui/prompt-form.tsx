'use client'

import { useActions, useUIState } from 'ai/rsc'
import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import {
  type IntervalOption,
  isValidInterval,
} from '@/components/routes/trade/trading-chart'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { Message } from 'ai'
import { toPng } from 'html-to-image'
import { nanoid } from 'nanoid'
import { UserMessage } from '../crypto-ui/message'
import { useEnterSubmit } from '../hooks/use-enter-submit'
import { IconArrowElbow } from './chat-icons'

interface PromptFormProps {
  input: string
  setInput: (value: string) => void
  scrollToLatestQuestion: () => void
}

export function PromptForm({
  input,
  setInput,
  scrollToLatestQuestion,
}: PromptFormProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { submitUserMessage } = useActions()
  const [, setMessages] = useUIState()
  const router = useRouter()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedInput = input.trim()
    if (!trimmedInput) return

    setInput('')
    const commandInput = trimmedInput.startsWith('/')
      ? await handleCommand(trimmedInput, router, searchParams)
      : ''

    console.log({ commandInput })

    let newMessage = trimmedInput

    if (commandInput) {
      if (typeof commandInput === 'object' && commandInput !== null) {
        const { instruction, image } = commandInput
        newMessage = `${trimmedInput}\n\nINSTRUCTION: ${instruction}`
      } else {
        newMessage = `${trimmedInput}\n\nIMPORTANT: ${commandInput}`
      }
    } else {
      newMessage = trimmedInput
    }

    try {
      setMessages((currentMessages: Message[]) => [
        ...currentMessages,
        {
          id: nanoid(),
          display: <UserMessage>{trimmedInput}</UserMessage>,
        },
      ])

      scrollToLatestQuestion()

      const responseMessage = await submitUserMessage({
        content: newMessage,
        // image,
      })

      setMessages((currentMessages: Message[]) => [
        ...currentMessages,
        responseMessage,
      ])
    } catch (error) {
      console.error('Error submitting user message:', error)
      // Add user-friendly error handling here
      setMessages((currentMessages: Message[]) => [
        ...currentMessages,
        {
          id: nanoid(),
          display: <UserMessage>{trimmedInput}</UserMessage>,
        },
        {
          id: nanoid(),
          content: "Sorry, I couldn't process that message. Please try again.",
          role: 'assistant',
        },
      ])
    }

    // if (window.innerWidth < 600) {
    //   ;(
    //     e.currentTarget.querySelector('textarea') as HTMLTextAreaElement
    //   )?.blur()
    // }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Card
        variant="outline"
        className="relative flex max-h-50 w-full grow flex-col overflow-hidden"
      >
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] w-full h-full resize-none bg-transparent pt-4 focus-within:outline-none sm:text-sm pr-10"
        />
        <div className="absolute right-2 top-6 sm:right-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="submit" size="icon" disabled={input === ''}>
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
    </form>
  )
}

type CommandHandler = (
  args: string[],
  router: ReturnType<typeof useRouter>,
  searchParams: ReturnType<typeof useSearchParams>,
) => Promise<string | null>

const commandHandlers: Record<string, CommandHandler> = {
  '/t': async (args, router, searchParams) => {
    const [pairArg, intervalArg] = args
    const { symbol, underlier, interval } = parsePairAndInterval(
      pairArg,
      intervalArg,
    )

    if (!symbol) return null

    const pair = `${symbol}${underlier}`
    const currentParams = new URLSearchParams(searchParams.toString())
    if (interval) currentParams.set('interval', interval)

    router.push(`/trade/perps/${pair}?${currentParams.toString()}`)
    console.log(`Pair: ${pair}, Interval: ${interval}`)
    return ''
  },

  '/ta': async () => {
    console.log('🍓 tech analysis command')
    const element = document.getElementById('trading-chart')
    if (!element) {
      console.error('No element found with id: trading-chart')
      return null
    }

    try {
      // Capture the element as a PNG image and get base64 data URL
      const imageDataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: 'transparent',
      })

      // The imageDataUrl is already in base64 format, starting with "data:image/png;base64,"
      // We can use it directly or extract just the base64 part if needed
      const base64Image = imageDataUrl.split(',')[1]

      // Create and return the final payload as a JSON object
      const payload = {
        instruction: 'Do technical analysis on the chart image.',
        image: base64Image, // or use imageDataUrl if you want to include the data URL prefix
      }
      console.log('🚀 /ta payload', payload)

      // Return the JSON stringified payload
      return JSON.stringify(payload)
    } catch (error) {
      console.error('Error capturing trading chart:', error)
      return null
    }
  },

  '/deposit': async (args) => {
    console.log('💰 Deposit command executed with args:', args)
    // Implement deposit logic here
    return 'Deposit command executed'
  },

  '/withdraw': async (args) => {
    console.log('💸 Withdraw command executed with args:', args)
    // Implement withdraw logic here
    return 'Withdraw command executed'
  },

  '/close': async (args) => {
    console.log('🚪 Close command executed with args:', args)
    // Implement close logic here
    return 'Close command executed'
  },

  '/mode': async (args) => {
    console.log('🔄 Mode command executed with args:', args)
    // Implement mode switching logic here
    return 'Mode command executed'
  },
}

async function handleCommand(
  command: string,
  router: ReturnType<typeof useRouter>,
  searchParams: ReturnType<typeof useSearchParams>,
): Promise<string> {
  const [cmd, ...args] = command.trim().toLowerCase().split(' ')
  const handler = commandHandlers[cmd]

  if (handler) {
    const result = await handler(args, router, searchParams)
    return result ?? ''
  }

  return `Unknown command. Available commands: ${Object.keys(commandHandlers).join(', ')}`
}

function parsePairAndInterval(pairArg: string, intervalArg?: string) {
  const defaultUnderlier = 'USDT'
  const defaultInterval: IntervalOption = 'D'

  if (pairArg.includes('usdt')) {
    const [, symbol = ''] = pairArg.match(/(.+)usdt/) ?? []
    return {
      symbol: symbol.toUpperCase(),
      underlier: defaultUnderlier,
      interval: parseInterval(intervalArg) ?? defaultInterval,
    }
  }

  const symbol = pairArg.toUpperCase()
  const underlier =
    intervalArg?.toUpperCase() === 'USDT'
      ? defaultUnderlier
      : (intervalArg?.toUpperCase() ?? defaultUnderlier)
  const interval = parseInterval(intervalArg) ?? defaultInterval

  if (symbol === 'USDT') {
    return { symbol: 'USDC', underlier: 'T', interval }
  }

  return { symbol, underlier, interval }
}

function parseInterval(intervalArg?: string): IntervalOption | null {
  if (!intervalArg) return null
  const providedInterval = intervalArg.toUpperCase()
  return isValidInterval(providedInterval) ? providedInterval : null
}
