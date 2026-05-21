# Maxim Simakoff Portfolio

Terminal-style interactive portfolio and resume site for Maxim Simakoff. The homepage uses a split operator-console layout, a React Three Fiber operating map, project/experience sections, and a private-contact configuration layer for deployment.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- React Three Fiber, Drei, and Three.js
- Framer Motion
- ESLint

## Features

- Terminal-inspired homepage with sticky/scrollable sidebar navigation.
- Active sidebar state that tracks clicks, hashes, and section scroll position.
- 3D operating map with graceful non-WebGL fallback components.
- Resume page with working in-page navigation for projects, experience, stack, and contact.
- Content-driven project, experience, stack, and resume data in one TypeScript module.
- Private contact details loaded from environment variables instead of hard-coded public repo data.

## Requirements

- Node.js 22
- npm 10+

The repo includes an `.nvmrc` pinned to Node 22.

## Setup

```bash
nvm install
nvm use
npm ci
```

For a looser local install, `npm install` also works.

## Environment

Copy the example file and fill in any private contact values you want rendered:

```bash
cp .env.example .env.local
```

Supported variables:

```bash
PORTFOLIO_LOCATION=
PORTFOLIO_EMAIL=
PORTFOLIO_PHONE=
PORTFOLIO_PHONE_HREF=
PORTFOLIO_LINKEDIN_LABEL=
PORTFOLIO_LINKEDIN_URL=
PORTFOLIO_GITHUB_LABEL=
PORTFOLIO_GITHUB_URL=
```

`.env.local` is ignored by git. Keep real contact values in local or deployment environment variables.

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

The production preview can be checked locally with:

```bash
npm run start -- -p 3001
```

## Content

Primary editable content lives in:

- `src/content/portfolio.ts`

Main rendered surfaces:

- `app/page.tsx`
- `app/resume/page.tsx`
- `src/components/home/system-scene.tsx`
- `src/components/home/hero-depth-visual.tsx`
- `src/components/three/`

## Deployment

This project is ready for Vercel or any Next.js-compatible host. Configure the same environment variables from `.env.example` in the deployment platform before publishing.

## Fresh Local Reset

```bash
rm -rf node_modules .next
nvm install
nvm use
npm ci
npm run dev
```
