<a href="https://spezigpt.com/">
  <h1 align="center">Spezi AI Assistant</h1>
</a>

<p align="center">
  An AI Assistant for the <a href="https://spezi.stanford.edu/">Stanford Spezi</a> framework.
</p>

## Features

- [Next.js](https://nextjs.org)
- [AI SDK](https://sdk.vercel.ai/docs)
- [shadcn/ui](https://ui.shadcn.com)
- Data Persistence with [Vercel Postgres](https://vercel.com/storage/postgres) and [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- [NextAuth.js](https://github.com/nextauthjs/next-auth) for authentication

## Running locally

You will need to update the environment variables [see the example file in `.env.example`](.env.example) to run the Spezi AI Assistant.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).
