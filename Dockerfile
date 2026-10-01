FROM node:24-slim

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --allow-build=esbuild

COPY . .

EXPOSE 42069
CMD ["pnpm", "start"]