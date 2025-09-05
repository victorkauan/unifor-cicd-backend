FROM node:20-alpine

COPY package*.json ./
COPY prisma ./

RUN npm ci --only=production
RUN npx prisma migrate deploy
RUN npx prisma generate

COPY dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/server.js"]
