FROM node:14.19.2 as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./ ./

RUN npm run dev

CMD ["npm", "run", "dev"]