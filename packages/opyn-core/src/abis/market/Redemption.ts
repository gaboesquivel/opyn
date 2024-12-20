import type { Abi } from 'viem'

export const RedemptionAbi: Abi = [
  {
    type: 'function',
    name: '__Redemption_init',
    inputs: [
      { name: '_controller', type: 'address', internalType: 'address' },
      { name: '_spanMargin', type: 'address', internalType: 'address' },
      { name: '_oracle', type: 'address', internalType: 'address' },
      {
        name: '_protocolUnderlyingAsset',
        type: 'address',
        internalType: 'address',
      },
      { name: '_vault', type: 'address', internalType: 'address' },
      {
        name: '_powerPerpFactory',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'controller',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRedemptionPayout',
    inputs: [
      {
        name: '_payoutAsset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_perpToRedeem',
        type: 'address',
        internalType: 'address',
      },
      { name: '_perpAmount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isHighRiskVault',
    inputs: [
      { name: '_owner', type: 'address', internalType: 'address' },
      {
        name: '_insolvencyPrice',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'oracle',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'powerPerpFactory',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'protocolUnderlyingAsset',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'redeem',
    inputs: [
      { name: '_owner', type: 'address', internalType: 'address' },
      {
        name: '_perpToRedeem',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_amountToRedeem',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_payoutAsset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_insolvencyPrice',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_preRedemptionSqrtRoots',
        type: 'bytes16[]',
        internalType: 'bytes16[]',
      },
      {
        name: '_postRedemptionSqrtRoots',
        type: 'bytes16[]',
        internalType: 'bytes16[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'spanMargin',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'vault',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'Initialized',
    inputs: [
      {
        name: 'version',
        type: 'uint64',
        indexed: false,
        internalType: 'uint64',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'InvalidAddress', inputs: [] },
  { type: 'error', name: 'InvalidAmount', inputs: [] },
  { type: 'error', name: 'InvalidBurnShortPerp', inputs: [] },
  { type: 'error', name: 'InvalidCollateralAmount', inputs: [] },
  { type: 'error', name: 'InvalidInitialization', inputs: [] },
  { type: 'error', name: 'InvalidLiquidateShort', inputs: [] },
  { type: 'error', name: 'InvalidWithdrawLongPerp', inputs: [] },
  { type: 'error', name: 'NoAvailableSlot', inputs: [] },
  { type: 'error', name: 'NotHighRiskVault', inputs: [] },
  { type: 'error', name: 'NotInitializing', inputs: [] },
  {
    type: 'error',
    name: 'SafeCastOverflowedIntToUint',
    inputs: [{ name: 'value', type: 'int256', internalType: 'int256' }],
  },
  {
    type: 'error',
    name: 'SafeCastOverflowedUintToInt',
    inputs: [{ name: 'value', type: 'uint256', internalType: 'uint256' }],
  },
  { type: 'error', name: 'UnsupportedAsset', inputs: [] },
  {
    type: 'error',
    name: 'VaultNotInsolventAtAllegedPrice',
    inputs: [],
  },
  { type: 'error', name: 'VaultPortfolioValuesWorse', inputs: [] },
]
