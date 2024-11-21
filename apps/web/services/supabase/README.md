# Supabase Next.js Service

Encapsulates all queries and mutations with Supabase, providing type-safe database access.

## Directory Structure

- **api/**: Contains API functions for data operations that:
  - Accept a Supabase client instance (server or browser)
  - Use type guards and return non-null data
  - Handle errors via captureAppError from @/services/sentry
  - Follow the SupaApiParams pattern
- **client.ts**: Browser-side Supabase client creation and management
- **server.ts**: Server-side Supabase client creation and management

## Usage Guidelines

### API Functions
- Accept SupaApiParams type for consistent client handling
- Never use try/catch blocks - use captureAppError instead
- Return type guards for queries and mutations
- Return data can never be null
- Follow this pattern:
