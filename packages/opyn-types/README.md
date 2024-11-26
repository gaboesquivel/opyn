# @opyn/types

Type definitions for Opyn.

## Overview

This package contains shared TypeScript type definitions used across the Opyn codebase.

### Types

- **`MarketType`**  
  Union type for different market types: `'spot' | 'perps' | 'vaults' | 'advanced'`

- **`PerpType`**  
  Union type for perpetual leverage options: `'1' | '0.5' | '2'`

- **`TradeSide`**  
  Union type for trade direction: `'long' | 'short'`

- **`AIBot`**  
  Union type for AI bot personalities: `'opyn' | 'degen' | 'trump'`

- **`OpynMarket`**  
  Type representing a market from the Supabase database

- **`MarketMetric`**  
  Type representing market metrics data

- **`PosTab`**  
  Union type for position tabs: `'positions' | 'orders' | 'history'`

### Usage

Import types directly from the package
