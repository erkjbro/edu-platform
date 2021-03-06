import express from 'express';

import * as courseController from '../controllers/course-controller.js';
import { checkAuth } from '../middleware/check-auth.js';

const router = express.Router();

router.get('/', courseController.getCourses);

router.get('/:courseId', courseController.getCourseById);

router.use(checkAuth);

router.post('/', courseController.postCourse);

router.patch('/:courseId', courseController.patchCourse);

router.delete('/:courseId', courseController.deleteCourse);

export { router as courseRoutes };
