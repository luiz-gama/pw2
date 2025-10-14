FROM node:22-trixie-slim As build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-trixie-slim As production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json .
RUN npm ci --omit=dev 
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./next.config.js
EXPOSE 3000
CMD ["npm", "start"]

FROM node:22-trixie-slim As development
WORKDIR /app
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]