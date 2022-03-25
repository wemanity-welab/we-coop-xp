FROM node:16.14.2-alpine3.15 as base
# install node
RUN apk add --update --no-cache tini
# set working directory
WORKDIR /usr/app
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]
# copy project file
COPY package.json .

FROM base as dependencies
# install build dependencies
# RUN apk add --update --no-cache python3 alpine-sdk && \
#     ln -sf python3 /usr/bin/python
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install

FROM base

WORKDIR /usr/app

COPY --from=dependencies --chown=node:node /usr/app/prod_node_modules ./node_modules

COPY --chown=node:node . .

USER node

CMD [ "npm", "run", "start:prod" ]
