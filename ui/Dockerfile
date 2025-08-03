FROM node:20-alpine as build-stage

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Add custom config to use $PORT env
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

# Port will be injected by Cloud Run
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
