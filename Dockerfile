FROM node:18-alpine

WORKDIR /app

COPY package.json babel.config.js ./
RUN npm install --production --ignore-scripts

COPY . .

CMD ["node", "generate.js"]
