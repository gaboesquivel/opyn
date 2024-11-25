import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@opyn/ui/opyn.css'
import '@rainbow-me/rainbowkit/styles.css'

import { NuqsAdapter } from 'nuqs/adapters/react'
import { Providers } from './components/providers.tsx'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NuqsAdapter>
      <Providers>
        <App />
      </Providers>
    </NuqsAdapter>
  </React.StrictMode>,
)
