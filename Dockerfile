FROM node:20-bookworm

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm ci

COPY . /opt/app

RUN npm install --also=dev && npm run build

CMD [ "npm", "start" ]