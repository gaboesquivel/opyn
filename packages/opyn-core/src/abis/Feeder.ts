import type { Abi } from 'viem'

export const FeederAbi: Abi = [
  {
    type: 'constructor',
    inputs: [{ name: '_factory', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'ADAPTER_DECIMALS',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MAX_ORACLE_LAG',
    inputs: [],
    outputs: [{ name: '', type: 'uint64', internalType: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: '_returnOwnerships',
    inputs: [
      {
        name: '_feederParams',
        type: 'tuple',
        internalType: 'struct FeederParams',
        components: [
          {
            name: 'deployerAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'protocolAsset',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'protocolNumeraire',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'controller',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'halfCrabStrategy',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'twoCrabStrategy',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'stableFlo',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'assetFlo',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'perpAddresses',
            type: 'address[4]',
            internalType: 'address[4]',
          },
          { name: 'oracle', type: 'address', internalType: 'address' },
          {
            name: 'vaultManager',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialPriceState',
            type: 'tuple',
            internalType: 'struct InitialPriceState',
            components: [
              {
                name: 'zeroPerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'halfPerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'onePerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'twoPerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'zeroPoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'halfPoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'onePoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'twoPoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
            ],
          },
          {
            name: 'liquidityPools',
            type: 'address[4]',
            internalType: 'address[4]',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'calculateActionsAndAmounts',
    inputs: [
      {
        name: '_protocolAssetAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_protocolNumeraireAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_feederParams',
        type: 'tuple',
        internalType: 'struct FeederParams',
        components: [
          {
            name: 'deployerAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'protocolAsset',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'protocolNumeraire',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'controller',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'halfCrabStrategy',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'twoCrabStrategy',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'stableFlo',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'assetFlo',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'perpAddresses',
            type: 'address[4]',
            internalType: 'address[4]',
          },
          { name: 'oracle', type: 'address', internalType: 'address' },
          {
            name: 'vaultManager',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialPriceState',
            type: 'tuple',
            internalType: 'struct InitialPriceState',
            components: [
              {
                name: 'zeroPerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'halfPerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'onePerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'twoPerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'zeroPoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'halfPoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'onePoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'twoPoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
            ],
          },
          {
            name: 'liquidityPools',
            type: 'address[4]',
            internalType: 'address[4]',
          },
        ],
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct VaultActionsLib.ActionArgs[]',
        components: [
          {
            name: 'actionType',
            type: 'uint8',
            internalType: 'enum VaultActionsLib.ActionType',
          },
          { name: 'owner', type: 'address', internalType: 'address' },
          { name: 'asset', type: 'address', internalType: 'address' },
          { name: 'amount', type: 'uint256', internalType: 'uint256' },
          { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
      },
      {
        name: '',
        type: 'tuple',
        internalType: 'struct DepositMintParams',
        components: [
          {
            name: 'amountOfNumeraireToDeposit',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amountOfAssetToDeposit',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'zeroPerpToMint',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'halfPerpToMint',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'onePerpToMint',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'fractionOfAssetToVault',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'fractionOfNumeraireToVault',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getLiquidityPools',
    inputs: [
      {
        name: '_protocolNumeraire',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_protocolAsset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'perpAddresses',
        type: 'address[4]',
        internalType: 'address[4]',
      },
      {
        name: '_halfCrabStrategy',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_twoCrabStrategy',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [{ name: '', type: 'address[4]', internalType: 'address[4]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'packFeederParams',
    inputs: [{ name: '_marketId', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct FeederParams',
        components: [
          {
            name: 'deployerAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'protocolAsset',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'protocolNumeraire',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'controller',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'halfCrabStrategy',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'twoCrabStrategy',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'stableFlo',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'assetFlo',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'perpAddresses',
            type: 'address[4]',
            internalType: 'address[4]',
          },
          { name: 'oracle', type: 'address', internalType: 'address' },
          {
            name: 'vaultManager',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'initialPriceState',
            type: 'tuple',
            internalType: 'struct InitialPriceState',
            components: [
              {
                name: 'zeroPerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'halfPerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'onePerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'twoPerpCarry',
                type: 'int64',
                internalType: 'int64',
              },
              {
                name: 'zeroPoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'halfPoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'onePoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'twoPoolSqrtPriceX96',
                type: 'uint160',
                internalType: 'uint160',
              },
            ],
          },
          {
            name: 'liquidityPools',
            type: 'address[4]',
            internalType: 'address[4]',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'seedPools',
    inputs: [
      { name: '_marketId', type: 'uint256', internalType: 'uint256' },
      {
        name: '_protocolAssetAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_protocolNumeraireAmount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_spanParams',
        type: 'tuple',
        internalType: 'struct ISpanMargin.VaultSpanParams',
        components: [
          { name: 'a', type: 'int256', internalType: 'int256' },
          { name: 'b', type: 'int256', internalType: 'int256' },
          { name: 'c', type: 'int256', internalType: 'int256' },
          { name: 'd', type: 'int256', internalType: 'int256' },
          {
            name: 'aDelta',
            type: 'int256[3]',
            internalType: 'int256[3]',
          },
          {
            name: 'bDelta',
            type: 'int256[3]',
            internalType: 'int256[3]',
          },
          {
            name: 'cDelta',
            type: 'int256[3]',
            internalType: 'int256[3]',
          },
          {
            name: 'dDelta',
            type: 'int256[3]',
            internalType: 'int256[3]',
          },
          {
            name: 'kinks',
            type: 'int256[2]',
            internalType: 'int256[2]',
          },
          { name: 'numKinks', type: 'uint256', internalType: 'uint256' },
        ],
      },
      {
        name: '_sqrtRoots',
        type: 'bytes16[]',
        internalType: 'bytes16[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'error', name: 'NotMarketOwner', inputs: [] },
  { type: 'error', name: 'R', inputs: [] },
  { type: 'error', name: 'T', inputs: [] },
]
