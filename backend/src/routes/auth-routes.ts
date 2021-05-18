import express from 'express';
import { check } from 'express-validator';

import * as authController from '../controllers/auth-controller.js';

const router = express.Router();

router.post('/signup', authController.postSignup);

router.post('/signup/:adminCode', authController.postSignup);

router.post(
  '/login',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').trim().isAlphanumeric().not().isEmpty(),
  ],
  authController.postLogin
);

export { router as authRoutes };
