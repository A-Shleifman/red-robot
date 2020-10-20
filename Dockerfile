FROM node:12.19-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

CMD npm start
