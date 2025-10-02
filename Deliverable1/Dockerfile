# ---- Stage 1: Build React frontend ----
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend

# Install frontend dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy all frontend source and build
COPY frontend/ ./
RUN npm run build   # outputs to frontend/dist (adjust if you use 'build')

# ---- Stage 2: Setup backend + serve frontend ----
FROM node:18-alpine
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Copy backend code
COPY backend/ ./

# Copy built frontend into backend's public folder
WORKDIR /app
COPY --from=frontend-build /app/frontend/dist ./frontend-dist

# Expose backend port
EXPOSE 4000

# Start server (modify server.js to serve frontend files)
CMD ["node", "backend/server.js"]
