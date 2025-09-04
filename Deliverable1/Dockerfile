# Use official Node image
FROM node:18

WORKDIR /app

# Copy package files
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install root dependencies (if any)
RUN npm install

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Copy all files
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm run build || npm run build:dev || npx webpack

# Expose backend port
EXPOSE 5000

# Start backend and frontend together (use concurrently if needed)
WORKDIR /app/backend
CMD ["node", "server.js"]