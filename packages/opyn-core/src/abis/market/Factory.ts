import type { Abi } from 'viem'

export const FactoryAbi: Abi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_params',
        type: 'tuple',
        internalType: 'struct DeployFactoryParams',
        components: [
          {
            name: 'factoryDeployer',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'uniswapFactory',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'uniswapPositionManager',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'uniswapRouterV1',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'uniswapQuoterV2',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'chainlinkSequencerFeed',
            type: 'address',
            internalType: 'address',
          },
          { name: 'pyth', type: 'address', internalType: 'address' },
          {
            name: 'cloneImplementationOracle',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationController',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationSpanMargin',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationAuction',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationRedemption',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationShutdown',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationVaultManager',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationPowerPerpFactory',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationPowerPerp',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationSafetyPool',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationSafetyPoolAuction',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationSafetyPoolLiquidation',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationStrategy',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationAssetChainlinkPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationAssetNumeraireChainlinkPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationAssetNumerairePythPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationAssetNumeraireChainlinkUniswapPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationAssetNumerairePythUniswapPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationAssetNumeraireUniswapPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationAssetPythPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationFloPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationHalfCrabPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationHalfPerpPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationFixedPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationOnePerpPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationTwoCrabPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationTwoPerpPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationWstEthNumerairePriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationZeroPerpPriceAdapter',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationFloEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationStrategyEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationNumeraireAssetEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationProtocolAssetEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationWstEthEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationAssetNumeraireLpEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationHalfCrabNumeraireLpEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationOnePerpAssetLpEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationTwoCrabNumeraireLpEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationUniswapV3LpEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationZeroPerpNumeraireLpEngine',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationUniV3NonFungibleAssetHandler',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationFlo',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationDepositManager',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationRebalanceManager',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'cloneImplementationCrabWorld',
            type: 'address',
            internalType: 'address',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: '_checkDeploymentParams',
    inputs: [
      {
        name: '_params',
        type: 'tuple',
        internalType: 'struct DeployMarketParams',
        components: [
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
            name: 'lowerSpanShock',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'upperSpanShock',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'lowerCarry',
            type: 'tuple',
            internalType: 'struct Carry',
            components: [
              {
                name: 'zeroPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'halfPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'onePerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'twoPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
            ],
          },
          {
            name: 'upperCarry',
            type: 'tuple',
            internalType: 'struct Carry',
            components: [
              {
                name: 'zeroPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'halfPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'onePerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'twoPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
            ],
          },
          {
            name: 'initialCarry',
            type: 'tuple',
            internalType: 'struct Carry',
            components: [
              {
                name: 'zeroPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'halfPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'onePerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'twoPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
            ],
          },
          {
            name: 'uniswapFee',
            type: 'uint24',
            internalType: 'uint24',
          },
          { name: 'oracleId', type: 'uint8', internalType: 'uint8' },
          {
            name: 'numeraireUsdOverrideForUniswapDeployments',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'deployMarket',
    inputs: [
      {
        name: '_params',
        type: 'tuple',
        internalType: 'struct DeployMarketParams',
        components: [
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
            name: 'lowerSpanShock',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'upperSpanShock',
            type: 'int256',
            internalType: 'int256',
          },
          {
            name: 'lowerCarry',
            type: 'tuple',
            internalType: 'struct Carry',
            components: [
              {
                name: 'zeroPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'halfPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'onePerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'twoPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
            ],
          },
          {
            name: 'upperCarry',
            type: 'tuple',
            internalType: 'struct Carry',
            components: [
              {
                name: 'zeroPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'halfPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'onePerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'twoPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
            ],
          },
          {
            name: 'initialCarry',
            type: 'tuple',
            internalType: 'struct Carry',
            components: [
              {
                name: 'zeroPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'halfPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'onePerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
              {
                name: 'twoPerpCarry',
                type: 'int256',
                internalType: 'int256',
              },
            ],
          },
          {
            name: 'uniswapFee',
            type: 'uint24',
            internalType: 'uint24',
          },
          { name: 'oracleId', type: 'uint8', internalType: 'uint8' },
          {
            name: 'numeraireUsdOverrideForUniswapDeployments',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getInitialCarry',
    inputs: [{ name: '_marketId', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
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
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'marketIdsByController',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'marketIdsByDeployer',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'markets',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: 'deployerAddress',
        type: 'address',
        internalType: 'address',
      },
      { name: 'controller', type: 'address', internalType: 'address' },
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
      { name: 'crabWorld', type: 'address', internalType: 'address' },
      { name: 'auction', type: 'address', internalType: 'address' },
      { name: 'stableFlo', type: 'address', internalType: 'address' },
      { name: 'assetFlo', type: 'address', internalType: 'address' },
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
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nextMarketId',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setChainlinkFeedAddress',
    inputs: [
      { name: '_token', type: 'address', internalType: 'address' },
      { name: '_feed', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setPythPriceId',
    inputs: [
      { name: '_token', type: 'address', internalType: 'address' },
      { name: '_priceId', type: 'bytes32', internalType: 'bytes32' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'uniswapFactory',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'uniswapPositionManager',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'DeployMarket',
    inputs: [
      {
        name: 'deployerAddress',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'marketId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'DifferentParity', inputs: [] },
  { type: 'error', name: 'ERC1167FailedCreateClone', inputs: [] },
  { type: 'error', name: 'InvalidCarry', inputs: [] },
  { type: 'error', name: 'InvalidLeverage', inputs: [] },
  { type: 'error', name: 'InvalidShock', inputs: [] },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
  { type: 'error', name: 'PriceFeedNotSet', inputs: [] },
]
