# Gunakan image Node versi 20
FROM node:20

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file dependency
COPY package*.json ./

# Install dependency
RUN npm install

# Salin semua file project
COPY . .

# Build hasil produksi Vite
RUN npm run build

# Install server ringan untuk preview hasil build
RUN npm install -g serve

# Expose port hasil preview
EXPOSE 4173

# Jalankan hasil build (production mode)
CMD ["serve", "-s", "dist"]