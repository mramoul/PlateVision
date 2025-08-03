# ----------- Build Stage -----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ----------- Production Stage -----------
FROM node:20-alpine

# Install lightweight static server
RUN npm install -g serve

WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app/dist .

# Let Cloud Run or hosting platform inject the correct port
ENV PORT=8080

EXPOSE 8080

# Use dynamic port assignment
CMD ["sh", "-c", "serve -s . -l $PORT"]
