FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /todo_be

COPY package*.json ./

RUN npm install pm2 -g

RUN npm install dotenv-cli -g

RUN npm install typescript -g

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD npm run prod