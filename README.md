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

To ingest markdown documentation and code files:

1. Place your markdown files in the `resources` directory

2. Run the ingestion script:

   ```bash
   pnpm ingest
   ```

The script will:
- Process all markdown and code files
- Split them into meaningful chunks
- Generate embeddings using OpenAI's embedding model
- Store the embeddings in your Postgres database

You can customize the chunk size and overlap in `scripts/ingest-markdown.ts`.

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm run dev
```