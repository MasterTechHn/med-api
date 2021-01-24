FROM node:12.16.3

WORKDIR /mep-api

COPY ["package.json", "package-lock.json" , "./"]

EXPOSE 8080/tcp

EXPOSE 8080/udp

RUN npm install -g nodemon

RUN npm install

COPY . .

CMD ["node","server.js"]