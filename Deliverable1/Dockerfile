# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy backend and frontend folders
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Expose port
EXPOSE 3000

# Start server from backend folder
WORKDIR /app/backend
CMD ["node", "server.js"]
