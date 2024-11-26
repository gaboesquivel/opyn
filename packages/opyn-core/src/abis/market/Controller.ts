import type { Abi } from 'viem'

export const ControllerAbi: Abi = [
  {
    type: 'function',
    name: '__Controller_init',
    inputs: [
      {
        name: '_protocolUnderlyingAsset',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_protocolNumeraireAsset',
        type: 'address',
        internalType: 'address',
      },
      { name: '_oracle', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'execute',
    inputs: [
      {
        name: '_actions',
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
        name: '_numZeroRoots',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'execute',
    inputs: [
      {
        name: '_actions',
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
  {
    type: 'function',
    name: 'executeSpanSim',
    inputs: [
      {
        name: '_actions',
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
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'feeOnFunding',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'feeOnLiquidation',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'feeOnShortPowerPerp',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getCurrentNormalizationFactor',
    inputs: [{ name: '_perp', type: 'address', internalType: 'address' }],
    outputs: [
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getFeeOnFunding',
    inputs: [
      { name: '_owner', type: 'address', internalType: 'address' },
      { name: '_perp', type: 'address', internalType: 'address' },
      {
        name: '_expectedNormFactor',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: '_perpAmount', type: 'int256', internalType: 'int256' },
    ],
    outputs: [
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPerpLastUpdateTimestampByVault',
    inputs: [
      { name: '_owner', type: 'address', internalType: 'address' },
      { name: '_perp', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPerpPriceInLiquidation',
    inputs: [{ name: '_perp', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getUnderlyingAssetPriceLookup',
    inputs: [{ name: '_timestamp', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'init',
    inputs: [
      { name: '_spanMargin', type: 'address', internalType: 'address' },
      { name: '_safetyPool', type: 'address', internalType: 'address' },
      {
        name: '_powerPerpFactory',
        type: 'address',
        internalType: 'address',
      },
      { name: '_redemption', type: 'address', internalType: 'address' },
      { name: '_vault', type: 'address', internalType: 'address' },
      { name: '_shutdown', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'isShutdown',
    inputs: [],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'liquidationPenaltyInFunding',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'int256', internalType: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'liquidationPenaltyInVol',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'int256', internalType: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'operators',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
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
    name: 'owner',
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
    name: 'protocolNumeraireAsset',
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
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'safetyPool',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setFeeOnFunding',
    inputs: [
      { name: '_perp', type: 'address', internalType: 'address' },
      { name: '_feeRate', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setFeeOnLiquidation',
    inputs: [
      { name: '_perp', type: 'address', internalType: 'address' },
      { name: '_feeRate', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setFeeOnShortPowerPerp',
    inputs: [
      { name: '_perp', type: 'address', internalType: 'address' },
      { name: '_feeRate', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setIsShutdown',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setLiquidationPenaltyInFunding',
    inputs: [
      { name: '_perp', type: 'address', internalType: 'address' },
      { name: '_funding', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setLiquidationPenaltyInVol',
    inputs: [
      { name: '_perp', type: 'address', internalType: 'address' },
      { name: '_vol', type: 'int256', internalType: 'int256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'shutdown',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'simulateExecute',
    inputs: [
      {
        name: '_actions',
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
    ],
    outputs: [
      {
        name: '',
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
    ],
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
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateOperator',
    inputs: [
      { name: '_operator', type: 'address', internalType: 'address' },
      { name: '_isActive', type: 'bool', internalType: 'bool' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'Call',
    inputs: [
      {
        name: 'callee',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'owner',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'caller',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'data',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DepositCollateral',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DepositNonFungibleAsset',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'vaultOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
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
  {
    type: 'event',
    name: 'Liquidate',
    inputs: [
      {
        name: 'liquidator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'vaultOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'debtAsset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amountToRepay',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'payoutAsset',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'payoutAmount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'liquidationFee',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LongPowerPerp',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'powerPerp',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
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
  {
    type: 'event',
    name: 'SetFeeOnFunding',
    inputs: [
      {
        name: 'powerperp',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'oldFeeRate',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newFeeRate',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetFeeOnLiquidation',
    inputs: [
      {
        name: 'powerperp',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'oldFeeRate',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newFeeRate',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetFeeOnShortPowerPerp',
    inputs: [
      {
        name: 'powerperp',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'oldFeeRate',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newFeeRate',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetLiquidationPenaltyInFunding',
    inputs: [
      {
        name: 'perp',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'funding',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SetLiquidationPenaltyInVol',
    inputs: [
      {
        name: 'perp',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'vol',
        type: 'int256',
        indexed: false,
        internalType: 'int256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ShortPowerPerp',
    inputs: [
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'powerPerp',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'feeOnShortPowerPerp',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'feeOnFunding',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UpdateOperator',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'isActive',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'WithdrawCollateral',
    inputs: [
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'WithdrawNonFungibleAsset',
    inputs: [
      {
        name: 'asset',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'vaultOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  { type: 'error', name: 'ActionTypeMismatch', inputs: [] },
  { type: 'error', name: 'AlreadyInitialized', inputs: [] },
  { type: 'error', name: 'CanNotHaveDiffOwners', inputs: [] },
  {
    type: 'error',
    name: 'CanNotLiquidateMoreThanHalfDebt',
    inputs: [],
  },
  { type: 'error', name: 'CanNotLiquidateSafetyPoolVault', inputs: [] },
  { type: 'error', name: 'CollateralNotSupported', inputs: [] },
  { type: 'error', name: 'IncorrectAmountForCustomArgs', inputs: [] },
  { type: 'error', name: 'InvalidAddress', inputs: [] },
  { type: 'error', name: 'InvalidAmount', inputs: [] },
  { type: 'error', name: 'InvalidBurnShortPerp', inputs: [] },
  { type: 'error', name: 'InvalidCollateralAmount', inputs: [] },
  { type: 'error', name: 'InvalidInitialization', inputs: [] },
  { type: 'error', name: 'InvalidLiquidateShort', inputs: [] },
  { type: 'error', name: 'InvalidLiquidationPenalty', inputs: [] },
  { type: 'error', name: 'InvalidNftOp', inputs: [] },
  { type: 'error', name: 'InvalidOwner', inputs: [] },
  { type: 'error', name: 'InvalidWithdrawLongPerp', inputs: [] },
  { type: 'error', name: 'NoAvailableSlot', inputs: [] },
  { type: 'error', name: 'NonFungibleAssetNotSupported', inputs: [] },
  { type: 'error', name: 'NotAuthorized', inputs: [] },
  { type: 'error', name: 'NotInitializing', inputs: [] },
  { type: 'error', name: 'NotRepayingDebtAsset', inputs: [] },
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
  { type: 'error', name: 'PowerPerpNotSupported', inputs: [] },
  { type: 'error', name: 'ProvidedSpanNotConservative', inputs: [] },
  { type: 'error', name: 'ReentrancyGuardReentrantCall', inputs: [] },
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
  { type: 'error', name: 'Shutdown', inputs: [] },
  { type: 'error', name: 'SimulateSpanRevert', inputs: [] },
  { type: 'error', name: 'VaultIsInsolvent', inputs: [] },
  { type: 'error', name: 'VaultNotLiquidatable', inputs: [] },
  { type: 'error', name: 'VaultNotSafe', inputs: [] },
  { type: 'error', name: 'VaultReentrancy', inputs: [] },
]