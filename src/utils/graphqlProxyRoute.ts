import express from 'express';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import graphqlProxyServer from '@src/utils/graphqlProxyServer';

const router = express.Router();

router.use('/', verifySession({ sessionRequired: false }), graphqlProxyServer);

export default router;
