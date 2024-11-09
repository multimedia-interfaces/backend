FROM node:lts-alpine as builder

WORKDIR /opt/app/

COPY --chown=node:node . ./

RUN npm ci
RUN npm run build
RUN npm prune --omit dev

FROM node:lts-alpine as production

WORKDIR /opt/app/

COPY --from=builder --chown=node:node /opt/app/package*.json ./
COPY --from=builder --chown=node:node /opt/app/build ./build
COPY --from=builder --chown=node:node /opt/app/node_modules ./node_modules

USER node

CMD ["node", "/opt/app/build/index.js"]
