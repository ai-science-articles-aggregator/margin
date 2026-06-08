# ---------- build stage ----------
FROM node:20-alpine AS build

RUN npm install -g pnpm
WORKDIR /app

# Зависимости (lockfile может не содержать adapter-node — поэтому без --frozen)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --no-frozen-lockfile

# Исходники и прод-сборка (adapter-node => папка build/)
COPY . .
RUN pnpm run build

# ---------- runtime stage ----------
FROM node:20-alpine AS runtime

RUN npm install -g pnpm
WORKDIR /app
ENV NODE_ENV=production

# Только то, что нужно для запуска
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --no-frozen-lockfile --prod

COPY --from=build /app/build ./build

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", "build"]
