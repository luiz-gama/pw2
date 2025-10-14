# --- build ---
FROM node:22-alpine3.22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- production ---
FROM node:22-alpine3.22 AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev         # <-- corrigido
COPY --from=build /app/dist ./dist
EXPOSE 6677
CMD ["npm","run","start:prod"]

# --- development ---
FROM node:22-alpine3.22 AS development
WORKDIR /app
ENV NODE_ENV=development
# 1) Instala também as devDeps (nodemon, tsx, typescript...)
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci || npm install
# 2) Copia o restante do código
COPY . .
EXPOSE 3000
# 6677
CMD ["npm","start"]
