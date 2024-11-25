'use client'
import { Button } from '@opyn/ui'
import { useConnect, useConnectors } from 'wagmi'

export function ConnectWalletButton() {
  const connectors = useConnectors()
  const { connect } = useConnect()

  const handleConnect = async () => {
    // Find the WalletConnect connector
    const walletConnectConnector = connectors.find(
      (connector) => connector.id === 'walletConnect',
    )
    if (walletConnectConnector) {
      await connect({ connector: walletConnectConnector })
    }
  }

  return (
    <div>
      <Button onClick={handleConnect} disabled={false}>
        Connect Wallet
      </Button>
      {/* {error && <p style={{ color: 'red' }}>{error.message}</p>} */}
    </div>
  )
}
