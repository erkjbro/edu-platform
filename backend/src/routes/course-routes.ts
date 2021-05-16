import express from 'express';

import * as courseController from '../controllers/course-controller.js';
import { checkAuth } from '../middleware/check-auth.js';

const router = express.Router();

router.get('/', courseController.getCourses);

router.use(checkAuth);

router.post('/', courseController.postCourse);

export { router as courseRoutes };
