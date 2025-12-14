# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Momentum Towing & Roadside Services** landing page built with Bun, React 19, Tailwind CSS, and shadcn/ui components. It's a marketing website with a dynamic hero background that randomly alternates between image slideshows and video backgrounds.

## Development Commands

**Start development server:**
```bash
bun dev
# or
bun --hot src/index.ts
```
Server runs at http://localhost:3000 with hot module replacement.

**Production server:**
```bash
bun start
```

**Build:**
```bash
bun run build
```

**Install dependencies:**
```bash
bun install
```

## Bun-Specific Guidelines

Default to using Bun instead of Node.js:

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install` or `yarn install`
- Bun automatically loads .env, so don't use dotenv

**Prefer Bun APIs:**
- `Bun.serve()` for HTTP servers (don't use `express`)
- `Bun.file()` for file operations (prefer over `node:fs`)
- `Bun.Glob()` for file pattern matching
- `bun:sqlite` for SQLite (don't use `better-sqlite3`)

## Architecture

### Server (`src/index.ts`)

Uses `Bun.serve()` with route-based architecture:

**Static file serving:**
- `/images/*` - Serves images from `./images/` folder
- `/videos/*` - Serves videos from `./videos/` folder

**API endpoints:**
- `/api/images` - Returns JSON list of all images in `/images` folder (auto-scanned with `Bun.Glob`)
- `/api/videos` - Returns JSON list of all videos in `/videos` folder (auto-scanned with `Bun.Glob`)
- `/api/hello` - Example API endpoint
- `/api/hello/:name` - Example parameterized route

**Frontend routing:**
- `/*` - Catch-all route serves `index.html` (HTML import)

**Development mode:**
- HMR enabled with `hmr: true`
- Browser console logs echoed to server with `console: true`

### Frontend Entry (`src/index.html` + `src/frontend.tsx`)

HTML imports are used - `index.html` imports `frontend.tsx` which renders React to `#root` div. Bun automatically bundles and transpiles.

### Hero Background System (`src/components/LandingPage.tsx`)

**Critical behavior:** On every page load, randomly chooses between two modes:

1. **Image slideshow mode** (50% chance):
   - Fetches images from `/api/images`
   - Creates dynamic CSS keyframes based on number of images detected
   - Each image: 10 seconds visible with Ken Burns zoom effect (scale 1 → 1.15 → 1)
   - Animation: 5s zoom in, 4.5s zoom out, 0.5s fade
   - Keyframes generated dynamically in `useEffect` and injected into `<style>` tag in `document.head`

2. **Video background mode** (50% chance):
   - Fetches videos from `/api/videos`
   - Plays first video found with `<video autoPlay loop muted playsInline>`
   - Uses `object-cover` to fill container

**Random selection:** Happens once on component mount via `Math.random() < 0.5`

**Important:** Images/videos are auto-detected from folders. To add media:
- Drop files in `/images/` or `/videos/` folders
- Supported formats: PNG, JPG, JPEG, GIF, WebP (images), MP4, WebM, MOV, AVI (videos)
- No code changes needed - API endpoints scan folders automatically

### Components

**UI Components (`src/components/ui/`):**
- shadcn/ui components (Button, Card, Input, Textarea, Select, Label)
- Use `@/components/ui/*` path alias

**Page Components:**
- `LandingPage.tsx` - Main landing page with hero + services + features + contact sections
- `ServicesCarousel.tsx` - Services showcase carousel
- `FeaturesCarousel.tsx` - Features/benefits carousel

### Styling

**Global styles:** `src/index.css` imports `styles/globals.css`

**Custom animations defined in `src/index.css`:**
- `fadeIn` - Fade in with translateY
- `fadeInLeft` / `fadeInRight` - Slide in from sides
- `bounceInteractive` - Bouncing effect
- `heroZoom` - Static zoom keyframes (fallback)
- Dynamic `heroZoomDynamic` - Generated in JavaScript based on image count

**Tailwind utilities:**
- Uses Tailwind CSS 4 with custom configuration
- Animation utilities from `tw-animate-css`
- Class merging with `tailwind-merge` and `clsx`

### Path Aliases

TypeScript path alias `@/*` maps to `src/*`:
```typescript
import { Button } from "@/components/ui/button";
```

## HTML Imports Pattern

Bun allows direct HTML imports. The server uses:

```typescript
import index from "./index.html";

Bun.serve({
  routes: {
    "/*": index,  // Serve HTML file
  }
});
```

HTML files can import TypeScript/JSX:
```html
<script type="module" src="./frontend.tsx"></script>
```

Bun automatically transpiles, bundles, and serves.
