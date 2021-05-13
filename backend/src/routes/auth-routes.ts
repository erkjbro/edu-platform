import express from 'express';

import * as authController from '../controllers/auth-controller.js';

const router = express.Router();

router.post('/signup', authController.postSignup);

export { router as authRoutes };
