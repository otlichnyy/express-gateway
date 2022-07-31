import express from 'express';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { hasuraProxyController } from '@src/controllers';

const router = express.Router();

router.route('/').post(verifySession(), hasuraProxyController.hasuraProxyCall);

export default router;
