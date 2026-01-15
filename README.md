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

- **Hero Images**: Drop files in `/images/` (PNG, JPG, JPEG, GIF, WebP)
- **Hero Videos**: Drop files in `/videos/` (MP4, WebM, MOV, AVI)
- **Gallery Images**: Drop files in `/gallery/` (PNG, JPG, JPEG, GIF, WebP)

No code changes needed - API endpoints scan folders automatically.

## Scripts

- `bun dev` - Start development server with hot reload
- `bun start` - Start production server
- `bun run build` - Build the project

## License

This project is open source and available under the MIT License.
