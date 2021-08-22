FROM node:12.19.0
WORKDIR /var/www/html
COPY package*.json ./
RUN npm install
COPY . .
RUN ls -al
EXPOSE 8888
CMD [ "node", "server.js" ]

