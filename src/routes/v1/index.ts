import express from 'express';
import userRouter from './users';
import hasuraProxyRouter from './hasura';

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

defaultRoutes.map(({ route, path }) => router.use(path, route));

export default router;
