# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy root and backend/frontend package.json for dependency install
COPY package.json ./ 
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Copy all app files
WORKDIR /app
COPY . .

# Expose port (match server.js)
EXPOSE 3000

# Start backend (which will serve React frontend)
WORKDIR /app/backend
CMD ["node", "server.js"]
