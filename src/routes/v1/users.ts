import express from 'express';
import { userController } from '@src/controllers';

const router = express.Router();

// userValidator
// validator-util
router.route('/').get(userController.getUsers);

export default router;
