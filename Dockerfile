FROM node:19.3.0-alpine
USER node
WORKDIR /app
COPY --chown=node . .
RUN yarn install && yarn cache clean && yarn tsc
CMD ["yarn", "start:prod"]