# Expressjs Gateway

The Relay which allows to model solution easily with hasura, enable few critical features like Authentication, rate limiting, caching. it also allow to proxy request to another REST endpoint to perform operations which hasura don't supports yet (e.g. streaming, render a pdf and stream to user) implemented by a service or another server.

## Features

- Authentication and Authorization using Supertokens sdk
- Rate Limiter using IP and Redis Store
- Graphql Proxy Server, proxying to hasura instance
- Cache Support for Proxy Server `@cache(ttl:100)` upto `MAX_RES_BYTES` with redis store
- REST proxy to worker instance
- Logging for Graphql server, query and mutation

## Development Workflow

- git clone the git repository
- select `Remote-container rebuild and open in container` for first time, then chose `reopen in container`
- code, push, pr, ci, merge
- close remote connection
- remove containers `docker rm $(docker ps -aq)`

## License

MIT
