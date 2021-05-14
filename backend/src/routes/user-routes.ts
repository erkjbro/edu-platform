import express from 'express';

import * as userController from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:userId', (req, res, next) => {});

router.patch('/:userId', (req, res, next) => console.log('update user'));

router.delete('/:userId', (req, res, next) => console.log('delete user'));

router.get('/', (req, res, next) => {});

router.get('/', (req, res, next) => {});

export { router as userRoutes };
