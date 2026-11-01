# PRAMAAN // Autonomous Public Service & Bureaucracy Execution Desk
# Base image: Official Microsoft Playwright with Chromium & system dependencies pre-installed
FROM mcr.microsoft.com/playwright:v1.49.0-noble

# Set working directory
WORKDIR /app

# Set non-interactive debian frontend and Node environment
ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_ENV=production
ENV PORT=7860

# Copy dependency manifests
COPY package.json ./

# Install npm dependencies
RUN npm install

# Copy application source code
COPY . .

# Build production frontend assets to /app/dist
RUN npm run build

# Ensure persistent uploads directory
RUN mkdir -p uploads

# Expose ports: 7860 (Hugging Face / Default Cloud) and 3001
EXPOSE 7860 3001

# Start the full-stack server (serves API, Legacy Portal, and compiled frontend SPA)
CMD ["npm", "start"]
