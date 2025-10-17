# server/Dockerfile

# Stage 1: build (include devDeps)
FROM node:20 AS builder
WORKDIR /app

# copy package and install all deps (dev + prod)
COPY package*.json ./
RUN npm install

# copy tsconfig and source
COPY tsconfig.json ./
COPY src ./src

# build TypeScript -> dist
RUN npm run build

# Stage 2: production image (smaller)
FROM node:20-slim
WORKDIR /app

# copy package manifest and install production deps only
COPY package*.json ./
RUN npm install --production

# copy built output from builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
