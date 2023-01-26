FROM node:19.3.0-alpine
USER node
WORKDIR /app
COPY --chown=node . .
RUN yarn install
RUN yarn build
RUN rm -rf .gitignore
RUN rm -rf src
RUN rm -rf .husky
RUN rm -rf .idea
RUN rm -rf .git
RUN rm -rf .localstack
RUN rm -rf .mongodb
RUN rm -rf Dockerfile
RUN rm -rf coverage
RUN rm -rf jest-integration-config.js
RUN rm -rf jest-mongodb-config.js
RUN rm -rf jest-unit-config.js
RUN rm -rf jest.config.js
RUN rm -rf localstack
RUN rm -rf microservice-fluxo.txt
RUN rm -rf tsconfig-build.json
RUN rm -rf tsconfig.json
RUN rm -rf docker-compose.yaml
CMD ["yarn", "start:prod"]