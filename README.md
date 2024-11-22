# Opyn Markets UI

Uniswap, but for perps
Any asset. Linear, stable, and option-like perps.
TradFi capital efficiency.

## Tech Stack

- **Turbo Monorepo**: Efficient codebase management and optimized build processes for large-scale projects.
- **Bun**: Ultra-fast JavaScript runtime, package manager, and build tool, enhancing development speed and efficiency.
- **Biome**: Modern, fast, and extensible toolchain for web projects, providing linting, formatting, and more.
- **Next.js 14**: Cutting-edge full-stack development with React Server Components, App Router, and server actions.
- **Tailwind CSS & shadcn/ui**: Rapid, customizable UI development with utility-first CSS and accessible component primitives.
- **EVM Integration**:
  - **viem**: Type-safe, lightweight library for low-level EVM interactions.
  - **wagmi**: React hooks for seamless EVM integration.
  - **Rainbow Kit**: Polished, customizable wallet connection UI for enhanced user experience.

## Project Structure

For detailed information on each component, please refer to their respective README files.

### Applications

- **Webapp (`/apps/web`)**: Main front-end application. [Details](/apps/web/README.md)

### Packages

- **Opyn API (`/packages/opyn-api`)**: Opyn API TypeScript SDK. [Details](/packages/opyn-api/README.md)
- **Opyn Core (`/packages/opyn-core`)**: Core smart contract interactions and ABIs. [Details](/packages/opyn-core/README.md)
- **Opyn Math (`/packages/opyn-math`)**: Math utilities for calculations. [Details](/packages/opyn-math/README.md)
- **Opyn Hooks (`/packages/opyn-hooks`)**: React hooks for interacting with smart contracts. [Details](/packages/opyn-hooks/README.md)
- **Opyn Alchemy (`/packages/opyn-alchemy`)**: Alchemy webhook handlers and blockchain event monitoring. [Details](/packages/opyn-alchemy/README.md)
- **Opyn Trigger (`/packages/opyn-trigger`)**: Trigger.dev job definitions and event handlers. [Details](/packages/opyn-trigger/README.md)
- **Opyn Supabase (`/packages/opyn-supabase`)**: Postgres database, types and zod schemas. [Details](/packages/opyn-supabase/README.md)
- **Opyn Errors (`/packages/opyn-errors`)**: Centralized error catalog. [Details](/packages/opyn-errors/README.md)

### Tooling

- **TypeScript Config (`/tooling/tsconfig`)**: Shared TS configurations.

## Installation

1. Install Bun globally:
   ```
   curl -fsSL https://bun.sh/install | bash
   ```

2. Clone the repository:
   ```
   git clone https://github.com/opynfinance/opyn.git
   cd opyn
   ```

3. Install dependencies and start the development server:
   ```
   bun install
   bun dev
   ```

This setup provides a faster JavaScript runtime and efficient package management for enhanced development efficiency.

# License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
