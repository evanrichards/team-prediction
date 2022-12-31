## Team Prediction Markets

## The stack

- 🧙 E2E type safety withh [tRPC](https://trpc.io)
- ⚡ Full-stack React with Next.js
- ⚡ Postgres Database with Prisma ORM
- 🔐 Authorization using [Auth0](auth0.com) via [next-auth](https://next-auth.js.org/)

## Setup

Ensure you have docker running locally.

```bash
yarn
yarn dx
```

## Commands

```bash
pnpm build      # runs `prisma generate` + `prisma migrate` + `next build`
pnpm db-nuke    # resets local db
pnpm dev        # starts next.js
pnpm dx         # starts postgres db + runs migrations + seeds + starts next.js
pnpm test-dev   # runs e2e tests on dev
pnpm test-start # runs e2e tests on `next start` - build required before
pnpm test:unit  # runs normal jest unit tests
pnpm test:e2e   # runs e2e tests
```
