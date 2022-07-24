import express from 'express';
import userRouter from './users';
import hasuraProxyRouter from './hasura';
import graphqlProxyRouter from './graphqlProxy';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/graphql',
    route: hasuraProxyRouter,
  },
];

const devRoutes = [
  {
    path: '/dev/graphql',
    route: graphqlProxyRouter,
  },
];

defaultRoutes.map(({ route, path }) => router.use(path, route));

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  devRoutes.map(({ route, path }) => router.use(path, route));
}

export default router;
