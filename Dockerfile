FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN mkdir -p /app/data /app/output

VOLUME ["/app/data", "/app/output"]

CMD ["npm", "run", "generate"]
