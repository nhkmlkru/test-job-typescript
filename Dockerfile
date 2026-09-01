FROM node:22-alpine AS build

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

COPY package.json package-lock.json* .npmrc ./
COPY prisma ./prisma

RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src

RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runtime

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production

COPY package.json package-lock.json* .npmrc ./
COPY prisma ./prisma

RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi \
  && npx prisma generate

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
