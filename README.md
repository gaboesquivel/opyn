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
- **Supabase (`/packages/supabase`)**: Postgres database, types and zod schemas. [Details](/packages/supabase/README.md)
- **Errors (`/packages/opyn-errors`)**: Centralized error catalog. [Details](/packages/errors/README.md)

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

