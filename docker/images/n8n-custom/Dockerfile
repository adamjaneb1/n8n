FROM node:20-alpine

# Install required dependencies
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    build-base

# Install pnpm globally as root
RUN npm install -g pnpm@latest

WORKDIR /usr/src/app

# Create non-root user
RUN addgroup -S n8n && \
    adduser -S -G n8n n8n && \
    chown -R n8n:n8n /usr/src/app

# Switch to non-root user
USER n8n

# Copy package files
COPY --chown=n8n:n8n package*.json ./
COPY --chown=n8n:n8n pnpm*.yaml ./

# Disable git hooks and strict SSL
RUN git config --global core.hooksPath /dev/null && \
    pnpm config set strict-ssl false

# Copy source
COPY --chown=n8n:n8n . .

# Install dependencies without scripts
RUN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
    pnpm install --frozen-lockfile --ignore-scripts

# Build
RUN pnpm build

ENV NODE_ENV=production
EXPOSE 5678

CMD ["node", "packages/cli/bin/n8n.js"]