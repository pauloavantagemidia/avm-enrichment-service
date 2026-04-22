FROM mcr.microsoft.com/playwright:v1.52.0-noble

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV PORT=3000

CMD ["npm", "start"]
