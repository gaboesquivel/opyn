# Opyn Markets Webapp
`
## Architectural Principles

- Rely on URL for state changes. See [Managing State with URLs](#managing-state-with-urls) for more details.
- API for reading and subscribing to data, evm transaction push for writing. [One Subscription per Route](#one-subscription-per-route).
- useQuery as standard for data fetching method, leveraging their features for flow control. See [Cached Queries](#cached-queries) for more details.
- Code organization by route and feature. See [Code Collocation](#code-collocation) for more details.
- Avoid Hasty Abstractions. [AHA Programming](#pragmatic-abstraction-aha-programming).

### Code Collocation

Code collocation is a principle in React development that emphasizes organizing code by feature or functionality rather than by file type. This approach, championed by Kent C. Dodds and others in the React community, offers several benefits:

1. **Improved Maintainability**: By keeping related code close together, it's easier to understand and modify features.
2. **Better Scalability**: As your application grows, collocated code remains manageable and doesn't spread across multiple directories.
3. **Faster Development**: Developers can focus on one feature at a time without jumping between different files and folders.
4. **Easier Refactoring**: When code is collocated, it's simpler to extract or move features as needed.

In practice, code collocation in React might look like this:

- Instead of separate directories for components, styles, and tests, you might have a feature-based structure.
- Related components, hooks, utilities, and tests are kept in the same directory.

For a more detailed explanation and examples, refer to Kent C. Dodds' article on the subject: [Colocation](https://kentcdodds.com/blog/colocation).

### Managing State with URLs

Relying on URLs for state changes in Next.js is a convention that enhances user experience by ensuring that application state is preserved across page reloads and can be easily shared. This approach involves using the URL to store application state, which can be particularly useful for managing user settings, filters, and other dynamic data.

Benefits of URL-Based State Management:

1. **Persistence**: By encoding state information in the URL, users can refresh the page without losing their current state. This is especially important for applications where users may navigate away and return later.
2. **Shareability**: Users can share URLs with specific states, allowing others to access the same view or settings directly.
3. **SEO Advantages**: Using canonical URLs helps search engines understand which version of a page should be indexed, preventing issues with duplicate content.


### One Subscription per Route

Implementing a single subscription for each route in a GraphQL or REST API architecture offers several advantages, particularly in terms of reducing connection overhead and simplifying data management. This approach involves consolidating multiple data streams into a single, comprehensive subscription tailored to each specific route. While GraphQL subscriptions maintain an open connection for real-time updates, this principle can also be applied to polling-based implementations in REST APIs, ensuring efficient and organized data fetching across the application.

Key Benefits:

1. **Reduced Connection Overhead**: By consolidating multiple subscriptions into a single one per route, the number of active connections to the server decreases. Each connection incurs overhead in terms of resources and management, so fewer connections can lead to improved performance and lower latency.
2. **Simplified Management**: Managing multiple subscriptions can be complex, especially in applications with numerous data streams. A single subscription per route simplifies this by reducing the number of subscriptions that need to be monitored and maintained, making it easier to implement changes or troubleshoot issues.
3. **Streamlined Traffic Management**: With fewer connections, traffic management becomes more efficient. The server can handle requests and responses more effectively, optimizing resource allocation and potentially lowering costs associated with data transfer.

Cached Queries

Singleton instances of queries are a powerful optimization technique that reduces server connections and improves data consistency across components. This approach is particularly beneficial when multiple components require the same data, allowing them to share a single query instance.

Benefits of Cached Queries:

1. **Reduced Server Load**: By minimizing redundant API calls, singleton queries decrease the overall load on your server.
2. **Improved Performance**: Fewer network requests lead to faster page loads and a smoother user experience.
3. **Consistent Data**: All components access the same data instance, ensuring consistency throughout the application.
4. **Efficient Caching**: Centralized data management simplifies cache invalidation and updates.

Implementation with React Query:

React Query provides built-in support for singleton queries through its intelligent caching mechanism. The query key acts as a unique identifier:

```typescript
import { useQuery } from '@tanstack/react-query'

function useUserData(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserData(userId),
  })
}
```

Key aspects of React Query's caching behavior:

1. **Caching**: Identical query keys return cached data, avoiding unnecessary API calls.
2. **Smart Refetching**: React Query automatically refetches stale data or when specific conditions are met (e.g., window focus, network reconnection).
3. **Shared State**: Components using the same query key share data and loading states.
4. **Automatic Deduplication**: Simultaneous requests for the same data are consolidated into a single API call.

Best Practices:

1. **Consistent Query Keys**: Use a standardized format for query keys to ensure proper caching and deduplication.
2. **Granular Keys**: Include relevant parameters in the query key for precise cache management.
3. **Global Queries**: For app-wide data, consider initializing queries at the root level.
4. **Prefetching**: Utilize React Query's prefetching capabilities to load data before it's needed.

Example of a global query:

```typescript
// In a top-level component or custom hook
const prefetchGlobalData = () => {
  queryClient.prefetchQuery({
    queryKey: ['globalConfig'],
    queryFn: fetchGlobalConfig,
  })
}

// Usage in components
const { data: globalConfig } = useQuery({
  queryKey: ['globalConfig'],
  queryFn: fetchGlobalConfig,
})
```

By leveraging cached queries effectively, you can significantly optimize your application's data fetching strategy, leading to improved performance and a better user experience.

### Pragmatic Abstraction (AHA Programming)

Pragmatic Abstraction, often referred to as AHA Programming, is a development philosophy that emphasizes simplicity and practicality in software design. It encourages developers to avoid unnecessary complexity and to focus on creating solutions that are both effective and easy to understand.

Key Principles:

1. **Avoid Premature Optimization**: Start with a simple and clear solution, and only optimize when necessary.
2. **Keep It Simple**: Use straightforward approaches that are easy to understand and maintain.
3. **Focus on the Problem**: Concentrate on solving the problem at hand rather than creating a more complex solution.
4. **Use Standard Libraries**: Leverage well-established libraries and patterns that have proven track records.
5. **Avoid Over-Engineering**: Resist the urge to create overly complex designs that may be harder to maintain.

Benefits:

1. **Simplicity**: AHA programming leads to simpler, more understandable code.
2. **Maintainability**: Code that is easy to understand is easier to maintain.
3. **Flexibility**: Simpler designs are more flexible and can adapt to changes more easily.

## Directory Structure

```
.
├── app                                 # Next.js app directory
│   ├── (routes)                        # Route groups
│   │   ├── layout.tsx                  # Root layout component
│   │   └── page.tsx                    # Root page component
│   ├── global-error.tsx                # Global error handling component
│   └── globals.css                     # Global CSS styles
├── assets                              # Static assets (images, fonts, etc.)
├── components                          # React components
│   ├── layout                          # Layout components
│   │   ├── footer                      # Footer components
│   │   ├── header                      # Header components
│   │   └── providers.tsx               # Context providers
│   ├── routes                          # Route-specific components
│   │   └── home                        # Home page components
│   ├── shared                          # Shared components
│   │   └── token-balance.tsx           # Token balance component
│   └── ui                              # UI components
│       ├── button.tsx                  # Button component
│       └── table.tsx                   # Table component
├── components.json                     # Shadcn UI components configuration
├── lib                                 # Utility functions and modules
│   ├── config.ts                        # Application configuration
│   ├── devtools.ts                     # Development tools
│   └── utils.ts                        # General utility functions
├── next-env.d.ts                       # Next.js TypeScript declarations
├── next.config.js                       # Next.js configuration
├── package.json                        # Project dependencies and scripts
├── postcss.config.js                    # PostCSS configuration
├── public                              # Public assets
├── services                            # External services integration
│   ├── supabase                        # Supabase nextjs client
│   └── sentry                          # Sentry error tracking service
├── tailwind.config.js                   # Tailwind CSS configuration
└── tsconfig.json                        # TypeScript configuration

```

## Tech Stack

- [Next.js](https://nextjs.org) 14, with React Server Components, App Router, and server actions.
  - [next-themes](https://github.com/pacocoursey/next-themes): Theme management.
  - [next-safe-action](https://github.com/TheEdoRan/next-safe-action): Type-safe server actions.
  - [nuqs](https://github.com/47ng/nuqs): URL query string management.
  - [@next/env](https://github.com/vercel/next.js/tree/canary/packages/next-env): Environment variable loading.
  - [@sentry/nextjs](https://docs.sentry.io/platforms/javascript/guides/nextjs/): Error tracking and performance monitoring.
  - [negotiator](https://github.com/jshttp/negotiator): HTTP content negotiation library.
  - [@next/third-parties](https://github.com/vercel/next.js/tree/canary/packages/third-parties): Third-party integrations.
  - [@vercel/analytics](https://vercel.com/analytics): Analytics for Vercel-hosted applications.
  - [@vercel/speed-insights](https://vercel.com/docs/speed-insights): Performance monitoring for Vercel deployments.
  - [@next/bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer): Analyzer for Next.js bundle sizes.
  - [server-only](https://github.com/vercel/server-only): Utility for server-side only code.
  - [sharp](https://sharp.pixelplumbing.com/): High-performance image processing.
  - [pino](https://getpino.io/): Fast and low overhead logging library for Node.js 
  -[pino-pretty](https://github.com/pinojs/pino-pretty): Prettifier for Pino logs, enhancing readability during development.
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com).
  - [Radix UI](https://radix-ui.com) for headless component primitives.
  - [class-variance-authority](https://cva.style/docs): Utility for creating variant classes.
  - [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin): Plugin for beautiful typographic defaults.
  - [clsx](https://github.com/lukeed/clsx): Utility for constructing className strings.
- [viem](https://viem.sh/): TypeScript interface for Ethereum.
- [wagmi](https://wagmi.sh/): React hooks for Ethereum.
  - [@wagmi/connectors](https://wagmi.sh/react/connectors): Wallet connectors for wagmi.
  - [@rainbow-me/rainbowkit](https://www.rainbowkit.com/): Wallet connection UI for Ethereum dApps.
- [@tanstack/react-query](https://tanstack.com/query/latest): Powerful asynchronous state management for React.
- [lodash](https://lodash.com/): Utility library for common programming tasks.
- [date-fns](https://date-fns.org/): Modern JavaScript date utility library.
- [framer-motion](https://www.framer.com/motion/): Animation library for React.
- [lucide-react](https://lucide.dev/): Icon library for React applications.
- [mini-svg-data-uri](https://github.com/tigt/mini-svg-data-uri): Optimizes SVGs for data URIs.
- [zod](https://zod.dev/): TypeScript-first schema validation.
- [@radix-ui/react-slot](https://www.radix-ui.com/primitives/docs/utilities/slot): Utility component for flexible composition.
- [@blockmatic/hooks-utils](https://github.com/blockmatic/hooks-utils): A collection of useful React hooks, including createContextHook for easy context creation and consumption.
- [pino-pretty](https://github.com/pinojs/pino-pretty): Prettifier for Pino logs. WalletConnect uses pino for logging.
- [react-device-detect](https://github.com/duskload/react-device-detect): Device detection for React applications.
- [react-hook-form](https://react-hook-form.com/): Performant form management for React.
  - [@hookform/resolvers](https://github.com/react-hook-form/resolvers): Validation resolvers for React Hook Form.
- [sonner](https://sonner.emilkowal.ski/): An opinionated toast component for React.
- [react-wrap-balancer](https://github.com/shuding/react-wrap-balancer): Text wrapping component for React.
- [uuid](https://github.com/uuidjs/uuid): UUID generation library.
- [vconsole](https://github.com/Tencent/vConsole): Mobile-friendly console for debugging.
- [@total-typescript/ts-reset](https://github.com/total-typescript/ts-reset): TypeScript reset to fix common TypeScript annoyances.

## Error Handling

This section outlines the error handling strategies implemented in the application:

1. **Server Actions**: Expected errors are modeled as return values, avoiding try/catch for predictable scenarios. `useActionState` manages these errors and communicates them to the client.

2. **Error Boundaries**: Unexpected errors are handled using error boundaries implemented in `error.tsx` and `global-error.tsx`, providing fallback UIs.

3. **Form Validation**: `useActionState` is combined with `react-hook-form` and `zod` for form validation. <Form> from shadcn/ui is used to wrap forms.

4. **Service Layer**: The `services/` directory throws user-friendly errors, which TanStack Query catches and displays.

5. **Standardized Response Structure**: Server actions return a consistent response structure using `/lib/actions.ts`.

6. **Centralized Error Management**: A centralized error object in `@repo/errors` maps error codes to descriptive messages:

7. **Server Action Error Return Example**: When handling errors in server actions, use the `ActionResponse` interface and the `opynErrors` object for consistency:

8. **Custom Error Objects**: Custom error objects with `code` and `message` properties are thrown based on centralized definitions.

9. **Error Logging**: Errors are logged to Sentry for comprehensive error tracking, monitoring, and analysis. This includes error codes, messages, and additional context for efficient debugging and issue resolution.


These practices aim to create a consistent and maintainable error handling system throughout the application. 


## Other Resources

- [Modern Nextjs Web3 Architecture](https://gaboesquivel.com/blog/2024-10-modern-nextjs-web3-architecture)
- [React App Standards](https://gaboesquivel.com/blog/2023-01-react-app-standards)
