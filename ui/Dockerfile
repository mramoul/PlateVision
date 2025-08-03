FROM node:20-alpine as build-stage

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine


COPY --from=build-stage /app/dist /usr/share/nginx/html

# Port will be injected by Cloud Run
EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
