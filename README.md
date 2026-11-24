# Maxim Simakoff Portfolio

Engineering portfolio and résumé for Maxim Simakoff. The homepage features an interactive model of a vintage workstation, selected projects, and recent experience drawn from his LinkedIn profile.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Three.js
- ESLint

## Features

- The workstation animates automatically. Drag or use the arrow keys to rotate it. Home resets the view. Explode slides its components apart in stages, and Assemble reverses the sequence from the current position.
- A locally rendered poster appears while the model loads and on devices without WebGL 2. With reduced motion enabled, the idle camera stays still while the CRT and activity lights keep running.
- Selected work opens with all six projects, grouped into professional projects and hackathon or coursework projects. Each illustration runs a local interactive demo. Click or tap the artwork, or focus it and press Enter or Space, to advance it manually. Select a project title for details and public links.
- Contact environment variables override the public location and profile links. Email and phone appear when configured.

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

- `src/content/career.ts`

Main rendered surfaces:

- `app/page.tsx`
- `app/resume/page.tsx`
- `src/components/work-gallery.tsx`
- `src/components/work-art.tsx`
- `src/components/workstation/`

## Deployment

This project is ready for Vercel or any Next.js-compatible host. Configure the same environment variables from `.env.example` in the deployment platform before publishing.

For GitHub Pages at [max.simakoff.com](https://max.simakoff.com/), run `npm run build:pages` and publish the contents of `out/` to the root of the `gh-pages` branch. The export uses root-relative URLs and includes the `CNAME` and `.nojekyll` files. To preview the original repository path locally, run `npm run build:pages -- --project-path`. Both static builds read contact configuration at build time.

## Fresh Local Reset

```bash
rm -rf node_modules .next
nvm install
nvm use
npm ci
npm run dev
```
