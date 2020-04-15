FROM debian:8 as node

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get dist-upgrade
RUN apt-get install build-essential curl -y

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

FROM node as dependencies

WORKDIR /usr/src/app

RUN mkdir client
RUN mkdir server
RUN mkdir bot

COPY package*.json ./
COPY ./client/package*.json ./client/
COPY ./server/package*.json ./server/
COPY ./bot/package*.json ./bot/

WORKDIR /usr/src/app/client
RUN npm install

WORKDIR /usr/src/app/server
RUN npm install

WORKDIR /usr/src/app/bot
RUN npm install

FROM node

WORKDIR /usr/src/app

COPY . .
COPY --from=dependencies /usr/src/app/client/node_modules /usr/src/app/client/node_modules
COPY --from=dependencies /usr/src/app/server/node_modules /usr/src/app/server/node_modules
COPY --from=dependencies /usr/src/app/bot/node_modules /usr/src/app/bot/node_modules

WORKDIR /usr/src/app/client
RUN npm run build
RUN mv /usr/src/app/client/build /usr/src/app/server/public

WORKDIR /usr/src/app
RUN npm install -g pm2

RUN curl -sL https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh > ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

EXPOSE 3001

CMD ["./wait-for-it.sh", "db:5432", "--", "pm2-runtime", "./config/services.config.js", "--only", "api,bot"]