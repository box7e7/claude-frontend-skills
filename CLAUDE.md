# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Momentum Towing & Roadside Services** landing page built with Bun, React 19, Tailwind CSS, and shadcn/ui components. It's a marketing website featuring:

- Dynamic hero background (image slideshow or video)
- Image gallery with carousel and lightbox
- Interactive service/feature/review carousels
- Google Maps integration
- Contact information display

**Business Contact:**
- Phone: 281-800-7676
- Email: metroroadsidetowing@gmail.com
- Address: 8100 Washington Ave, Suite 150G, Houston, TX 77007
- Hours: 24/7

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
- `/images/*` - Serves images from `./images/` folder (hero backgrounds)
- `/videos/*` - Serves videos from `./videos/` folder (hero backgrounds)
- `/gallery/*` - Serves images from `./gallery/` folder (gallery section)

**API endpoints:**
- `/api/images` - Returns JSON list of all images in `/images` folder (auto-scanned with `Bun.Glob`)
- `/api/videos` - Returns JSON list of all videos in `/videos` folder (auto-scanned with `Bun.Glob`)
- `/api/gallery` - Returns JSON list of all images in `/gallery` folder (sorted numerically)
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
- `LandingPage.tsx` - Main landing page with all sections (hero, services, gallery, reviews, features, contact, footer)
- `ImageGallery.tsx` - Gallery carousel with lightbox modal
- `ServicesCarousel.tsx` - Services showcase carousel
- `FeaturesCarousel.tsx` - Features/benefits carousel
- `ReviewsCarousel.tsx` - Customer reviews carousel

### Image Gallery (`src/components/ImageGallery.tsx`)

**Features:**
- Fetches images from `/api/gallery` on mount
- Responsive carousel (1/2/3 images based on screen width)
- Native lazy loading with `loading="lazy"` and `content-visibility: auto`
- Skeleton placeholders while images load
- Lightbox modal with:
  - Click image to open full-size view
  - Navigation arrows (prev/next)
  - Keyboard support (←/→ arrows, Escape to close)
  - Image counter (e.g., "3 / 17")
- Touch/drag support for mobile
- Auto-play with pause on hover

**To add gallery images:** Drop files in `/gallery/` folder (WebP recommended). Files are sorted numerically by filename.

### Contact Section

**Layout:**
- Google Maps iframe showing office location (Houston, TX)
- 4 contact cards: Phone, Email, Address, Hours
- Dark theme (`from-slate-900 via-blue-900 to-slate-900`)

**Footer:**
- White background with blue headings
- Dynamic copyright year: `{new Date().getFullYear()}`

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

## Performance Optimizations

### Image Optimization

All images converted to WebP format for 80%+ size reduction:

| Asset | Before | After | Savings |
|-------|--------|-------|---------|
| Hero images | 18.3 MB (PNG) | 1.1 MB (WebP) | 94% |
| Gallery images | 4.6 MB (JPG) | 3.3 MB (WebP) | 30% |

**To convert images:**
```bash
cwebp -q 75 input.jpg -o output.webp
```

### Caching

All static routes include cache headers (1 year):
```typescript
headers.set("Cache-Control", "public, max-age=31536000, immutable");
```

Routes with caching: `/images/*`, `/gallery/*`, `/videos/*`

### Lazy Loading

Gallery images use:
- `loading="lazy"` - Native browser lazy loading
- `decoding="async"` - Non-blocking decode
- `content-visibility: auto` - Skip rendering off-screen content
- Skeleton placeholders during load

### Mobile Optimizations

- Gallery: Progress bar instead of dots on mobile (`sm:hidden` / `hidden sm:flex`)
- Reviews: Stacked layout on mobile, side-by-side on desktop
- Typography: Consistent `text-3xl md:text-4xl` for section titles, `text-lg` for descriptions

### Safari/iOS Video Compatibility

Videos require special handling for Safari/iOS:

**Video encoding requirements:**
```bash
ffmpeg -i input.mp4 -c:v libx264 -profile:v baseline -level 3.0 \
  -pix_fmt yuv420p -c:a aac -movflags +faststart -y output.mp4
```

Key flags:
- `-movflags +faststart`: Moves moov atom to beginning (required for streaming)
- `-profile:v baseline`: Most compatible H.264 profile for iOS
- `-level 3.0`: Ensures older Safari compatibility

**Server requirements:**
- Must support Range requests (`Accept-Ranges: bytes`)
- Return `206 Partial Content` for Range requests
- Include `Content-Range` header

**Video element attributes:**
```tsx
<video autoPlay loop muted playsInline preload="auto">
  <source src={videoUrl} type="video/mp4" />
</video>
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
