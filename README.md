# Maxim Simakoff Portfolio

Minimal Next.js portfolio and resume site built for Vercel deployment.

## Important Note About `venv`

This project is a Node/Next.js app, not a Python app, so a Python `venv` is not the right dependency-isolation tool here.

The safer equivalent for this repo is:

- pin the Node version with `.nvmrc`
- keep packages local in `node_modules`
- install from `package-lock.json`

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion

## Recommended Setup

### 1. Install and use the pinned Node version

```bash
nvm install
nvm use
node -v
```

This repo includes an `.nvmrc` file set to Node 22.

### 2. Install dependencies locally

Use `npm ci` when you want a clean, lockfile-based install:

```bash
npm ci
```

If `node_modules` does not exist yet and you are doing the first install, this also works:

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Run checks

```bash
npm run lint
npm run build
```

## Fresh Start Commands

If you want to fully recreate the local environment from scratch:

```bash
rm -rf node_modules .next
nvm install
nvm use
npm ci
npm run dev
```

## Content

Editable site content lives in `src/content/portfolio.ts`.

Sensitive contact details are not stored in the repository. Put them in `.env.local`
for local development and in Vercel project environment variables for deployment.

Copy `.env.example` to `.env.local` and fill in the values you want rendered on the site.
