# Next-Auth with Prisma ORM

This is a simple Next.js project that fully authenticated with next-auth and store user data in sqlite database.

## Getting Started

First, install npm dependencies:

```bash
npm i
```

Second, migrate database:

```bash
npx prisma migrate dev --name init
```

Finally, run dev server and test the website locally:

```bash
npm run dev
```
