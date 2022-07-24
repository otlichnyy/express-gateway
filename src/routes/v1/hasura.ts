import express from 'express';
import { hasuraProxyController } from '@src/controllers';

const router = express.Router();

router.route('/').post(hasuraProxyController.hasuraProxyCall);

export default router;
