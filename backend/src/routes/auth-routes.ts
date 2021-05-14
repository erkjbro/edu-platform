import express from 'express';

import * as authController from '../controllers/auth-controller.js';

const router = express.Router();

router.post('/signup', authController.postSignup);

router.post('/signup/:adminCode', authController.postSignup);

router.post('/login', authController.postLogin);

export { router as authRoutes };
