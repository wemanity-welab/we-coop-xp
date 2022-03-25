FROM node:16.14.2-alpine
RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/app

COPY . .

RUN npm ci --production
CMD [ "dumb-init", "npm", "run", "start:prod" ]