FROM node:alpine

WORKDIR /app2

COPY ./package*.json ./
RUN npm i
COPY src/ ./src

CMD ["npm", "run", "dev"]