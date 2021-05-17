import express from 'express';

import * as userController from '../controllers/user-controller.js';
import { checkAuth } from '../middleware/check-auth.js';

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/role/:userRole', userController.getUsersByRole);

router.get('/:userId', userController.getUserById);

router.use(checkAuth);

router.post('/admin/create-user', userController.postUser);

// router.patch('/:userId', (req, res, next) => console.log('update user'));

// router.delete('/:userId', (req, res, next) => console.log('delete user'));

export { router as userRoutes };
