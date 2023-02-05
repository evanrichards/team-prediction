## Team Prediction Markets

## The stack

- 🧙 E2E type safety withh [tRPC](https://trpc.io)
- ⚡ Full-stack React with Next.js
- ⚡ MySql Database with Prisma ORM, Planetscale production storage
- 🔐 Authorization using [Auth0](auth0.com) via [next-auth](https://next-auth.js.org/)

## Setup

Ensure you have docker running locally.

```bash
yarn
yarn dx
```

## Commands

```bash
yarn build      # runs `prisma generate` + `prisma migrate` + `next build`
yarn db-nuke    # resets local db
yarn dev        # starts next.js
yarn prisma:dev # applies new changes to db, makes a migration, regens client
```

## Theming

We are using catppuccin theme for this project. I have found the following
links very helpful for styling:

- [Catppucin Style Guide](https://github.com/catppuccin/catppuccin/blob/main/docs/style-guide.md)
