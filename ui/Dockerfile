# Build Stage
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production Stage
FROM node:20-alpine

# Install `serve`
RUN npm install -g serve

WORKDIR /app
COPY --from=build-stage /app/dist .

# Cloud Run provides PORT env var (default 8080)
ENV PORT=8080

EXPOSE 8080

# Start the server
CMD ["serve", "-s", ".", "-l", "8080"]
