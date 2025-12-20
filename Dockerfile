# Use official Bun image as base
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies (production + dev for build)
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install production dependencies only
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy source code and build
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Optional: Run build step if needed
# RUN bun run build

# Production image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/src ./src
COPY --from=prerelease /app/package.json .
COPY --from=prerelease /app/tsconfig.json .

# Copy static assets
COPY --from=prerelease /app/images ./images
COPY --from=prerelease /app/videos ./videos
COPY --from=prerelease /app/styles ./styles

# Expose the port the app runs on
EXPOSE 3000

# Set user to non-root for security
USER bun

# Start the production server
CMD ["bun", "start"]
