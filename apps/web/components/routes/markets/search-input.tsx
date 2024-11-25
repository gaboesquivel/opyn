'use client'

import { SearchInput } from "@/components/ui/input"
import { useCmdK } from "@/lib/hooks"
import { useRef } from "react"

export function MarketSearchInput() {

    const searchInputRef = useRef<HTMLInputElement>(null)
    useCmdK(() => searchInputRef.current?.focus())

    return (
        <SearchInput
            ref={searchInputRef}
            type="search"
            placeholder="Search markets..."
            className="bg-transparent placeholder:text-gray-500"
            deco={
            <span className="text-sm text-gray-500">K</span>
            }
        />
    )
}