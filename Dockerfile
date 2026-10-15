# ------------------------------------------------
# Stage 1: Dependencies
# ------------------------------------------------
FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY app/package.json app/package-lock.json* ./

# Install dependencies
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# ------------------------------------------------
# Stage 2: Builder
# ------------------------------------------------
FROM node:24-alpine AS builder

# Build arguments for CDN and S3 configuration
ARG awsKey
ARG CDN_ENABLED=${awsKey:+true}
ARG CDN_URL=https://cdn-web-2.ruangguru.com/schoters-portal-login

WORKDIR /app

# Copy package files
COPY app/package.json app/package-lock.json* ./

# Install all dependencies (including devDependencies)
RUN npm ci --ignore-scripts

# Copy source code from dir app
COPY app/ ./

# Set CDN environment variables for build
ENV CDN_ENABLED=${CDN_ENABLED}
ENV CDN_URL=${CDN_URL}

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build Next.js application with CDN configuration
RUN npm run build

# ------------------------------------------------
# Stage 3: Upload to S3
# ------------------------------------------------
FROM amazon/aws-cli:latest AS uploader

# Set arguments for CDN and S3 configuration
ARG awsKey
ARG awsSecret
ARG CDN_ENABLED=${awsKey:+true}

# Upload assets to S3 if CDN is enabled
ENV AWS_ACCESS_KEY_ID=${awsKey}
ENV AWS_SECRET_ACCESS_KEY=${awsSecret}
ENV AWS_S3_BUCKET=rg-cdn-web
ENV AWS_REGION=ap-southeast-1
ENV AWS_S3_BASE_PATH=schoters-portal-login

# Set working directory
WORKDIR /app

# Copy built Next.js static assets from builder stage
COPY --from=builder /app/.next/static ./.next/static

# Upload to S3 only if CDN is enabled
RUN if [ "$CDN_ENABLED" = "true" ]; then \
    echo "📦 Uploading Next.js static assets to S3..."; \
    aws s3 sync ./.next/static s3://$AWS_S3_BUCKET/$AWS_S3_BASE_PATH/_next/static --region $AWS_REGION --acl public-read; \
    echo "✅ Assets uploaded successfully to s3://$AWS_S3_BUCKET/$AWS_S3_BASE_PATH/_next/static"; \
    else \
    echo "⏭️  CDN disabled, skipping S3 upload"; \
    fi

# ------------------------------------------------
# Stage 4: Runner
# ------------------------------------------------
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port
EXPOSE 80

ENV PORT=80

# Start the application
CMD ["node", "server.js"]
