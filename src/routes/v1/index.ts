import express from 'express';
import userRouter from './users';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRouter,
  },
];

defaultRoutes.map(({ route, path }) => router.use(path, route));

export default router;
