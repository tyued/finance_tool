# MAINTAINER Diao Liu 

FROM node:14.17.3-alpine3.14


COPY package*.json /app/
RUN  cd ./app && npm install

WORKDIR /app
COPY . /app

# node=dev
ENV node=start

# This is the example，need to change to the service real port
EXPOSE 8000

CMD npm run $node

