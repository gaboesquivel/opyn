export function getAccountPositions(account: string) {
  return {}
}

export function getAccountInfo(account?: string) {
  return {
    equity: 2000.0,
    health: {
      status: 'Fair',
      value: 0.33, // Assuming 1/3 based on the UI description
    },
    liquidation: {
      low: 3000.0,
      high: 3500.0,
    },
    netFunding: 0.00084,
  }
}

export function getAccountPosition(pair: string) {
  return {
    pair,
    size: 1000,
    entryPrice: 1500,
    liquidationPrice: 1200,
    margin: 500,
    leverage: 2,
    unrealizedPnl: 100,
    realizedPnl: 50,
    marginType: 'isolated',
    side: 'long',
    underlier: {
      address: '0x1234567890123456789012345678901234567890',
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      isStable: false,
      chainId: 42161,
      chainType: 'evm',
    },
    counterpart: {
      address: '0x0987654321098765432109876543210987654321',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      isStable: true,
      chainId: 42161,
      chainType: 'evm',
    },
    collateral: 50000,
    liq: {
      low: 300000,
      high: 330800,
    },
  }
}
