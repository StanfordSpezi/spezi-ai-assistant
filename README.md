# Spezi AI Assistant

A friendly code assistant that helps users with their questions about the <a href="https://spezi.stanford.edu/">Stanford Spezi</a> framework.

## Features

- [Next.js](https://nextjs.org)
- [AI SDK](https://sdk.vercel.ai/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [LangChain](https://www.langchain.com/)
- Data Persistence with [Vercel Postgres](https://vercel.com/storage/postgres) and [Vercel Blob](https://vercel.com/storage/blob)
- [NextAuth.js](https://github.com/nextauthjs/next-auth) for authentication

## Local Development

You will need to update the environment variables [see the example file in `.env.example`](.env.example) to run the Spezi AI Assistant.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

### Database Setup

1. Set up your Postgres database (either locally or using Vercel Postgres)

2. Add your database URL to the `.env` file:

   ```
   POSTGRES_URL="postgres://..."
   ```

3. Initialize the database:

   ```bash
   # Generate the database schema
   pnpm db:generate

   # Push the schema to your database
   pnpm db:push

   # Optional: Open the database UI
   pnpm db:studio
   ```

### Ingesting Documentation

The system can automatically generate documentation from GitHub repositories and ingest it into the database:

1. Add the repositories you want to ingest to the `config/repositories.yml` file.

2. Generate LLM-friendly markdown summaries of the repositories that are saved into the `resources` directory:

   ```bash
   pnpm generate
   ```

3. Ingest all markdown files from the `resources` directory into the database:

   ```bash
   pnpm ingest
   ```

4. You can also generate and ingest in one command, if desired:

   ```bash
   pnpm generate-and-ingest
   ```

You can customize all of the above in `scripts/ingest.ts`.

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm run dev
```