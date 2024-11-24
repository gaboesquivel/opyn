import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FaucetTable } from './components/faucet-table'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between p-6 ">
        <div className="flex items-center">
          <span className="text-xl font-semibold text-brand-500">
            Opyn Faucet
          </span>
        </div>
        <div className="flex">
          <ConnectButton
            showBalance={true}
            chainStatus={'full'}
            accountStatus={'full'}
          />
        </div>
      </nav>
      <main className="flex flex-col items-center justify-center py-12">
        <FaucetTable />
      </main>
    </div>
  )
}
