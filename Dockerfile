FROM node:alpine3.16 AS base
WORKDIR /app
COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .

FROM base AS dev
RUN npm install
EXPOSE 4001
CMD ["npm","run" ,"dev"]