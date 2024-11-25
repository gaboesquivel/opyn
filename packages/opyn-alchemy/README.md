# @opyn/alchemy

A TypeScript package that provides strongly-typed Alchemy webhook handlers and utilities for monitoring blockchain events across multiple networks.

## Features

- Type-safe webhook event handling with Zod validation
- Support for Ethereum and Arbitrum networks 
- Utilities for validating webhook signatures
- Integration with Trigger.dev for event processing
- Built with Viem v2 for reliable blockchain interactions

## Getting Started

This project follows the [Alchemy SDK Developer Challenge Guide](https://docs.alchemy.com/docs/sdk-developer-challenge-guide-7) to set up and configure Alchemy webhooks. The guide provides step-by-step instructions. For detailed implementation steps and best practices, refer to the guide above.


## Dependencies

 [Alchemy SDK](https://www.npmjs.com/package/alchemy-sdk): Used for interacting with Alchemy's API and setting up webhooks.
 [Trigger.dev](https://www.npmjs.com/package/@trigger.dev/sdk): Used for creating and managing serverless functions and workflows.
 [Viem](https://www.npmjs.com/package/viem): Ethereum JavaScript library for interacting with the Ethereum blockchain.

## Documentation

For more information on how to use Alchemy's services and set up webhooks, refer to the [Alchemy Documentation](https://docs.alchemy.com/).

## Related Projects

For details on how these webhooks are processed and used in our Trigger.dev jobs, please see the [Trigger App README](../trigger/README.md).


To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.1.24. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
