# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -f

# Copy application code
COPY . .

# Build the application
RUN npx vite build --mode production

# Runtime stage - using serve for a lightweight production server
FROM node:20-alpine

WORKDIR /app

# Install serve - a lightweight server for static files
RUN npm install -g serve

# Copy built app from build stage
COPY --from=build /app/dist ./build

# Expose port for the app
EXPOSE 65535

# Command to run the app
CMD ["serve", "-s", "build", "-l", "65535"]