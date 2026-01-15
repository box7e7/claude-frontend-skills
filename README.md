# Momentum Towing & Roadside Services

A professional landing page for **Momentum Towing & Roadside Services** built with Bun, React 19, Tailwind CSS, and shadcn/ui components. Features a dynamic hero background, image gallery with lightbox, and interactive carousels.

## Features

- **Dynamic Hero Background**: Randomly alternates between image slideshows (Ken Burns effect) and video backgrounds
- **Image Gallery**: Carousel with lazy loading, lightbox modal, and keyboard navigation
- **Interactive Carousels**: Services, Features, and Customer Reviews with touch/drag support
- **Google Maps Integration**: Embedded map showing office location
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Native lazy loading, content-visibility, skeleton placeholders

## Tech Stack

- **Bun Runtime**: Ultra-fast JavaScript runtime with built-in bundling
- **React 19**: Latest React with improved performance
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: Accessible component library
- **TypeScript**: Type-safe development
- **Lucide React**: Icon library

## Project Structure

```
bun-project/
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── LandingPage.tsx  # Main page with all sections
│   │   ├── ImageGallery.tsx # Gallery with carousel & lightbox
│   │   ├── ServicesCarousel.tsx
│   │   ├── FeaturesCarousel.tsx
│   │   └── ReviewsCarousel.tsx
│   ├── lib/                 # Utility functions
│   ├── frontend.tsx         # React entry point
│   ├── index.html           # HTML entry point
│   ├── index.ts             # Bun server with API routes
│   └── index.css            # Global styles
├── gallery/                 # Gallery images (auto-detected)
├── images/                  # Hero background images
├── videos/                  # Hero background videos
├── styles/                  # Additional stylesheets
├── build.ts                 # Build configuration
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.3.3 or higher

### Installation

Install dependencies:

```bash
bun install
```

### Development

Start the development server with hot reload:

```bash
bun dev
```

The application will be available at `http://localhost:3000` (or the configured port).

### Production

Run the production server:

```bash
bun start
```

### Build

Build the project:

```bash
bun run build
```

## API Endpoints

The Bun server provides the following API routes:

| Endpoint | Description |
|----------|-------------|
| `/api/images` | Returns list of hero background images |
| `/api/videos` | Returns list of hero background videos |
| `/api/gallery` | Returns list of gallery images (sorted) |
| `/images/*` | Serves static images |
| `/videos/*` | Serves static videos |
| `/gallery/*` | Serves gallery images |

## Page Sections

1. **Hero** - Dynamic background with CTA buttons
2. **Services** - Carousel showcasing towing services
3. **Gallery** - Image gallery with lightbox (lazy loaded)
4. **Reviews** - Customer testimonials carousel
5. **Features** - Why choose us carousel
6. **Contact** - Google Map + contact information cards
7. **Footer** - Quick links and contact details

## Contact Information

- **Phone**: 281-800-7676
- **Email**: metroroadsidetowing@gmail.com
- **Address**: 8100 Washington Ave, Suite 150G, Houston, TX 77007
- **Hours**: 24/7

## Adding Media

Media files are auto-detected from folders:

- **Hero Images**: Drop files in `/images/` (WebP recommended)
- **Hero Videos**: Drop files in `/videos/` (MP4, WebM, MOV, AVI)
- **Gallery Images**: Drop files in `/gallery/` (WebP recommended)

No code changes needed - API endpoints scan folders automatically.

## Performance Optimizations

This project implements several optimizations for fast page load times:

### Image Optimization

| Asset Type | Original Format | Optimized Format | Size Reduction |
|------------|-----------------|------------------|----------------|
| Hero Images | PNG (18.3 MB) | WebP (1.1 MB) | **94%** |
| Gallery Images | JPG (4.6 MB) | WebP (3.3 MB) | **30%** |
| **Total** | **22.9 MB** | **4.4 MB** | **81%** |

All images converted to WebP format using `cwebp` with quality 75-80 for optimal size/quality balance.

### Lazy Loading

- **Native lazy loading**: `loading="lazy"` on all gallery images
- **Async decoding**: `decoding="async"` for non-blocking image decode
- **Content visibility**: `content-visibility: auto` for off-screen content
- **Skeleton placeholders**: Loading states while images load

### Caching Strategy

All static assets served with aggressive cache headers:

```
Cache-Control: public, max-age=31536000, immutable
```

| Route | Cache Duration |
|-------|----------------|
| `/images/*` | 1 year |
| `/gallery/*` | 1 year |
| `/videos/*` | 1 year |

### Mobile Optimizations

- **Responsive typography**: Font sizes scale appropriately for mobile screens
- **Progress bar navigation**: Gallery uses progress bar instead of 17 dots on mobile
- **Touch/swipe support**: All carousels support touch gestures
- **Reduced padding**: Optimized spacing for smaller screens

### Best Practices

1. **Use WebP format** for all new images (80%+ smaller than PNG/JPG)
2. **Optimize before upload**: Use `cwebp -q 75 input.jpg -o output.webp`
3. **Keep images under 500KB** each for optimal load times
4. **Test on mobile**: Use Chrome DevTools device emulation

## Scripts

- `bun dev` - Start development server with hot reload
- `bun start` - Start production server
- `bun run build` - Build the project

## License

This project is open source and available under the MIT License.
