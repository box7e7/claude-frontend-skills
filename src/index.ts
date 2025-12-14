import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve static images
    "/images/*": async (req) => {
      const url = new URL(req.url);
      const filepath = `.${url.pathname}`;
      const file = Bun.file(filepath);

      if (await file.exists()) {
        return new Response(file);
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

    // API endpoint to list all images in the images folder
    "/api/images": async () => {
      const imagesDir = "./images";
      const glob = new Bun.Glob("*.{png,jpg,jpeg,gif,webp}");
      const images: string[] = [];

      for await (const file of glob.scan(imagesDir)) {
        images.push(`/images/${file}`);
      }

      return Response.json({ images });
    },

    // API endpoint to list all videos in the videos folder
    "/api/videos": async () => {
      const videosDir = "./videos";
      const glob = new Bun.Glob("*.{mp4,webm,mov,avi}");
      const videos: string[] = [];

      for await (const file of glob.scan(videosDir)) {
        videos.push(`/videos/${file}`);
      }

      return Response.json({ videos });
    },

    // Serve static videos
    "/videos/*": async (req) => {
      const url = new URL(req.url);
      const filepath = `.${url.pathname}`;
      const file = Bun.file(filepath);

      if (await file.exists()) {
        return new Response(file);
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
