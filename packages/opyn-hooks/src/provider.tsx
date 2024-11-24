import { NuqsAdapter } from 'nuqs/adapters/next'
import type { ReactNode } from 'react'

type NuqsProviderProps = {
  children: ReactNode
}

export const OpynNuqsAdapter = ({ children }: NuqsProviderProps) => {
  return <NuqsAdapter>{children}</NuqsAdapter>
}
