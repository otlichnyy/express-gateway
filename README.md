# 🚀 Minimal Expressjs Boilerplate

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Minimal setup with best practices in development with nodejs, npm, Docker and Dev containers done for you. Use this template and extends as per need of your project without wasting time on config. Its easy to add App Deps then Dev deps.

## 🔧 Requirements

- nvm
- docker
- docker-compose
- vscode
- docker-extension (vscode extension)

## ✨ Development Deps

- Typescript and ts-node
- Eslint configured with typescript, airbnb-base and jest
- Prettier makes code consistent across team
- Path resolvers use `import {add} from '@src\math'`
- Nodemon and ts-node for development environment
- Debugging nodejs ts code
- Testing using Jest
- Pre-commit hooks and linting at git staged using husky
- Commitzen for consistent commit message
- `.nvmrc` for local non docker based development
- Hot reloading with docker container
- Isolation of core deps like os, nodejs, npm and other
- Debugging support in docker with docker-compose
- `npm-force-resolutions` for patching vulnerable packages in preinstall script

## ✨ App Deps

Application dependencies that help to build experss server. You can easily Extend Application Deps without worrying about the dev deps and its environments. Here are few app deps for you.

- express
- morgan
- helmet
- dotenv-safe
- rate-limit
- zod

## Development Workflow (with docker)

1. git clone
2. docker-compose -f `docker-compose.debug.yaml` up -d
3. write code && commit code && push to git (`git cz`)
4. docker-compose -f `docker-compose.debug.yaml` down -v

### Debugging in docker-compose

go to debug tab, select `docker: Attach to Node` debugger will be attached , you can see the logs in docker tab.

## Development Workflow (without docker)

Without docker

```sh
nvm install && nvm use
```

debugger

```sh
npm run dev:debug
```

go to debug tab, add attach to nodejs.

## Docker

This template has all utils that support non Docker based development, but Docker based development using docker-compose is highly encouraged. Dockerfile in this templates provides lots of benefits during development like hot reloading (source code mount from host), debugging support (using docker-compose.debug.yaml) and isolation of node. npm, os and other.

## License

MIT
