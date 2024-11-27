'use client'

import { useCmdK } from '@/lib/hooks'
import { SearchInput } from '@opyn/ui'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useCallback, useRef } from 'react'
import { useDebounce } from 'react-use'

export function MarketSearchInput() {
  const [query, setQuery] = useQueryState('query', { defaultValue: '' })
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  useCmdK(() => searchInputRef.current?.focus())

  useDebounce(
    () => {
      router.refresh()
    },
    250,
    [query],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setQuery(value || null)
    },
    [setQuery],
  )

  return (
    <SearchInput
      ref={searchInputRef}
      type="search"
      placeholder="Search markets..."
      className="bg-transparent placeholder:text-gray-500"
      value={query}
      onChange={handleChange}
      deco={<span className="text-sm text-gray-500">K</span>}
    />
  )
}
