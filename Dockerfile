# Use Node.js official image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose the port that Vite uses
EXPOSE 5888

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
