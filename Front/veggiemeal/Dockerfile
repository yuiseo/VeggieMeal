FROM node:14.19.2 as builder

WORKDIR /var/jenkins_home/workspace/frontend/Front/veggiemeal

COPY . ./
RUN npm i
RUN npm run build

CMD ["npm", "start"]

