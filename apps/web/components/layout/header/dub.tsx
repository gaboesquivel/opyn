'use client'

import { generateShortLink } from '@/app/actions/dub'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { ClipboardDocumentIcon, ShareIcon } from '@heroicons/react/24/solid'
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useState } from 'react'

export function DubShareDialog() {
  const [slug, setSlug] = useState('')
  const { execute, result, status, reset } = useAction(generateShortLink)

  // Reset state when component unmounts
  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  const isLoading = status === 'executing'
  const isSuccess = status === 'hasSucceeded'

  const handleSubmit = () => {
    execute({ url: window.location.href, slug })
  }

  const shortLink = result?.data?.info?.shortLink

  const handleCopy = () => {
    shortLink && navigator.clipboard.writeText(shortLink)
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ShareIcon className="text-brand-500 h-4 w-4 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="text-center flex flex-col items-center">
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertDialogTitle className="text-brand-500 text-center">
            Share Your Trading Genius!
          </AlertDialogTitle>
          <AlertDialogDescription className="py-4 text-center">
            Ready to show off your trade? Create a custom link to share your
            trading skills with others. Just don't blame us if they copy! 📈✨
          </AlertDialogDescription>
          <div className="flex flex-col items-center gap-4 w-full">
            {shortLink ? (
              <div className="flex items-center justify-center gap-2 bg-background/10 p-2 rounded w-full">
                <p className="text-white font-bold text-center">{shortLink}</p>
                <ClipboardDocumentIcon
                  className="h-5 w-5 text-brand-500 cursor-pointer hover:text-brand-400 flex-shrink-0"
                  onClick={handleCopy}
                />
              </div>
            ) : (
              <Input
                type="text"
                placeholder="Customize your link (optional)"
                className="w-full text-center"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                disabled={isLoading}
              />
            )}
          </div>
        </AlertDialogHeader>
        <div className="flex flex-col items-center gap-2">
          {!isSuccess && (
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
              type="button"
              className="h-10 min-w-[150px] border border-brand-500 bg-brand-500/20 hover:bg-brand-500/20 text-brand-500 hover:text-brand disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Share'}
            </AlertDialogAction>
          )}
          <AlertDialogCancel className="h-10 min-w-[150px]">
            {isSuccess ? 'Close' : 'Cancel'}
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
