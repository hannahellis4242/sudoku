FROM node:alpine3.14

WORKDIR /client

COPY client/src ./src
COPY client/package.json .
COPY client/tsconfig.json .
COPY client/webpack.config.js .

RUN npm i
RUN npx webpack

WORKDIR /webserver

COPY webserver/src ./src
COPY webserver/public ./public
COPY webserver/package.json .
COPY webserver/tsconfig.json .

RUN npm i
RUN npx tsc

CMD node dist/main.js
