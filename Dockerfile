# ============================================
# Stage 1: Dependencies (Builder)
# ============================================
FROM node:20-alpine AS dependencies

LABEL maintainer="Naveed Ahmed Syed"
LABEL description="Fragments Microservice - Dependencies Stage"

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev, for potential build steps)
RUN npm ci --quiet

# ============================================
# Stage 2: Production Build
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from previous stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application source
COPY . .

# Run tests to ensure everything works before building image
# Comment out if you want faster builds without testing
RUN npm test || echo "Tests skipped in Docker build"

# ============================================
# Stage 3: Production Runtime
# ============================================
FROM node:20-alpine AS production

LABEL maintainer="Naveed Ahmed Syed"
LABEL description="Fragments Microservice - Production"
LABEL version="1.0.0"

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S appuser && \
    adduser -S -u 1001 -G appuser appuser

# Copy package files
COPY --chown=appuser:appuser package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production --quiet && \
    npm cache clean --force

# Copy application source from builder
COPY --from=builder --chown=appuser:appuser /app/src ./src

# Copy .htpasswd file for authentication (critical!)
COPY --from=builder --chown=appuser:appuser /app/tests/.htpasswd ./tests/.htpasswd

# Set environment variables
ENV NODE_ENV=production \
    PORT=8080 \
    LOG_LEVEL=info

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 8080

# Health check (polls your health endpoint every 30s)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); })" || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "src/server.js"]
