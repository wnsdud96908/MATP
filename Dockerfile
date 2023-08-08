FROM ubuntu:22.04

RUN apt-get -qq update
RUN apt-get -qq upgrade --yes
RUN apt-get -qq install curl --yes
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get -qq install nodejs --yes
RUN apt-get -qq install vim --yes
RUN apt-get -qq install net-tools

WORKDIR /app

COPY ./package.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 3002

ENTRYPOINT ["pm2-runtime", "/app"]