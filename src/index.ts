import { serve } from "bun";
import index from "./index.html";

// Helper function to compress response
function compressResponse(response: Response): Response {
  // Bun automatically handles compression when Accept-Encoding header is present
  return response;
}

// Helper function to add cache headers
function addCacheHeaders(response: Response, maxAge: number): Response {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", `public, max-age=${maxAge}, immutable`);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const server = serve({
  routes: {
    // Serve static images with cache headers (1 year)
    "/images/*": async (req) => {
      const url = new URL(req.url);
      const filepath = `.${url.pathname}`;
      const file = Bun.file(filepath);

      if (await file.exists()) {
        const response = new Response(file);
        return addCacheHeaders(response, 31536000); // 1 year
      }
      return new Response("Not Found", { status: 404 });
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    // API endpoint to list all images in the images folder (with short cache)
    "/api/images": async () => {
      const imagesDir = "./images";
      // Serve optimized WebP images (sorted for consistent order)
      const glob = new Bun.Glob("*.webp");
      const images: string[] = [];

      for await (const file of glob.scan(imagesDir)) {
        images.push(`/images/${file}`);
      }

      // Sort images alphabetically for consistent slideshow order
      images.sort();

      const response = Response.json({ images });
      return addCacheHeaders(response, 3600); // 1 hour cache
    },

    // API endpoint to list all videos in the videos folder (with short cache)
    "/api/videos": async () => {
      const videosDir = "./videos";
      const glob = new Bun.Glob("*.{mp4,webm,mov,avi}");
      const videos: string[] = [];

      for await (const file of glob.scan(videosDir)) {
        videos.push(`/videos/${file}`);
      }

      const response = Response.json({ videos });
      return addCacheHeaders(response, 3600); // 1 hour cache
    },

    // Serve static videos with cache headers (1 year)
    "/videos/*": async (req) => {
      const url = new URL(req.url);
      const filepath = `.${url.pathname}`;
      const file = Bun.file(filepath);

      if (await file.exists()) {
        const response = new Response(file);
        return addCacheHeaders(response, 31536000); // 1 year
      }
      return new Response("Not Found", { status: 404 });
    },

    // Serve index.html for all unmatched routes.
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
