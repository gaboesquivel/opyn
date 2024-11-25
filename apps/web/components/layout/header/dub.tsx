'use client'

import { generateShortLink } from '@/app/actions/dub'
import { ClipboardDocumentIcon, ShareIcon } from '@heroicons/react/24/solid'
import { Input } from '@opyn/ui'
import { AlertDialogAction, AlertDialogCancel, OpynAlertDialog } from '@opyn/ui'
import { useAction } from 'next-safe-action/hooks'
import { useEffect, useState } from 'react'

function ShortLinkDisplay({
  link,
  onCopy,
}: { link: string; onCopy: () => void }) {
  return (
    <div className="flex items-center justify-center gap-2 bg-background/10 p-2 rounded w-full">
      <p className="text-white font-bold text-center">{link}</p>
      <ClipboardDocumentIcon
        className="h-5 w-5 text-brand-500 cursor-pointer hover:text-brand-400 flex-shrink-0"
        onClick={onCopy}
      />
    </div>
  )
}

function DialogActions({
  isSuccess,
  isLoading,
  onSubmit,
}: {
  isSuccess: boolean
  isLoading: boolean
  onSubmit: () => void
}) {
  return (
    <>
      {!isSuccess && (
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          type="button"
          variant="brand"
          className="h-10 min-w-[150px]"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Share'}
        </AlertDialogAction>
      )}
      <AlertDialogCancel className="h-10 min-w-[150px]">
        {isSuccess ? 'Close' : 'Cancel'}
      </AlertDialogCancel>
    </>
  )
}

export function DubShareDialog() {
  const [slug, setSlug] = useState('')
  const { execute, result, status, reset } = useAction(generateShortLink)

  useEffect(() => {
    return () => reset()
  }, [reset])

  const isLoading = status === 'executing'
  const isSuccess = status === 'hasSucceeded'
  const shortLink = result?.data?.info?.shortLink

  const handleSubmit = () => {
    execute({ url: window.location.href, slug })
  }

  const handleCopy = () => {
    shortLink && navigator.clipboard.writeText(shortLink)
  }

  const dialogBody = shortLink ? (
    <ShortLinkDisplay link={shortLink} onCopy={handleCopy} />
  ) : (
    <Input
      type="text"
      placeholder="Customize your link (optional)"
      className="w-full text-center"
      value={slug}
      onChange={(e) => setSlug(e.target.value.toLowerCase())}
      disabled={isLoading}
    />
  )

  return (
    <OpynAlertDialog
      trigger={<ShareIcon className="text-brand-500 h-4 w-4 cursor-pointer" />}
      title="Share Your Trading Genius!"
      description="Ready to show off your trade? Create a custom link to share your trading skills with others. Just don't blame us if they copy! 📈✨"
      body={dialogBody}
      actions={
        <DialogActions
          isSuccess={isSuccess}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      }
    />
  )
}
