# Claude Frontend Skills

A modern frontend project built with Bun, React 19, Tailwind CSS, and shadcn/ui components. This project demonstrates Claude's frontend development capabilities using the latest web technologies.

## Features

- **Bun Runtime**: Ultra-fast JavaScript runtime with built-in bundling, transpiling, and package management
- **React 19**: Latest React with improved performance and features
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Beautiful, accessible, and customizable component library
- **TypeScript**: Type-safe development experience
- **Hot Module Replacement**: Instant feedback during development
- **HTML Imports**: Direct HTML file imports with automatic bundling

## Project Structure

```
bun-project/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── LandingPage.tsx
│   │   ├── FeaturesCarousel.tsx
│   │   └── ServicesCarousel.tsx
│   ├── lib/             # Utility functions
│   ├── frontend.tsx     # Main React entry point
│   ├── index.html       # HTML entry point
│   ├── index.ts         # Bun server
│   └── index.css        # Global styles
├── styles/              # Additional stylesheets
├── build.ts             # Build configuration
└── package.json         # Dependencies and scripts
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

## Tech Stack

### Core
- **Bun**: Fast all-in-one JavaScript runtime
- **React 19**: UI library
- **TypeScript**: Type safety

### Styling
- **Tailwind CSS 4**: Utility-first CSS
- **tw-animate-css**: Animation utilities
- **class-variance-authority**: CSS variant management
- **tailwind-merge**: Merge Tailwind classes

### Components
- **shadcn/ui**: Accessible component system
- **Radix UI**: Unstyled accessible components
- **Lucide React**: Icon library

## Development Features

- **Hot Module Replacement**: Changes reflect instantly
- **Built-in Bundler**: No need for webpack or vite
- **TypeScript Support**: Full type checking and IntelliSense
- **CSS Bundling**: Automatic CSS processing and optimization
- **HTML Imports**: Import HTML files directly with `Bun.serve()`

## Bun-Specific Features

This project leverages Bun's unique capabilities:

- Direct HTML file imports for routing
- Built-in JSX/TSX transpilation
- Fast package installation and execution
- Native TypeScript support
- Optimized bundling and serving

## Scripts

- `bun dev` - Start development server with hot reload
- `bun start` - Start production server
- `bun run build` - Build the project

## Contributing

This project demonstrates Claude's frontend development skills. Feel free to explore, modify, and build upon it.

## License

This project is open source and available under the MIT License.
