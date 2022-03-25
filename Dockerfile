FROM node:16.14.2


WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . ./

CMD ["npm", "run", "start:dev"]


