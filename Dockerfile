FROM node:16.14.2-alpine3.15 as base
# install node
RUN apk add --update --no-cache tini
# set working directory
WORKDIR /usr/app
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]

FROM base as builder
# copy project file
COPY package.json .
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
# copy production node_modules aside
RUN cp -R node_modules ../prod_node_modules
# install ALL node_modules
RUN npm install
# build app
COPY . .
RUN npm run build

FROM base
# get app files from builder
COPY --from=builder --chown=node:node /usr/prod_node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/app/dist dist

USER node

CMD [ "node", "dist/src/main"]
