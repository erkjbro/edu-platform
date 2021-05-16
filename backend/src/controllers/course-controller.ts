import { RequestHandler } from 'express';
import mongoose from 'mongoose';

import HttpError from '../models/http-error.js';
import { Course, CourseDoc } from '../models/course.js';
import { User } from '../models/user.js';

// PUBLIC
// get courses
export const getCourses = (async (req, res, next) => {
  let courses;
  try {
    courses = await Course.find({});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong; courses not found.',
      500
    );
    return next(error);
  }

  res.json({
    message: 'Fetched courses successfully!',
    data: courses,
  });
}) as RequestHandler;

// get courseById

// ADMIN

// get courseDetailsById - protected info like grades, students enrolled, etc.

// post course
export const postCourse = (async (req: any, res, next) => {
  const { title, description, skillLevel }: CourseDoc = req.body;
  const { userId, role } = req.userData;

  if (role !== 'admin') {
    const error = new HttpError('You are not allowed to create courses', 403);
    return next(error);
  }

  const createdCourse = new Course({
    title,
    description,
    skillLevel,
    creator: userId,
  });

  // try / catch
  let admin;

  admin = await User.findById(userId, '-password');

  if (!admin) {
    throw new Error('no admin found');
  }
  // Check db user role for AuthZ

  try {
    // Create mongoose session and start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    await createdCourse.save({ session });

    admin.courses.push(createdCourse);

    await admin.save({ session });

    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError('Course creation failed.', 500);
    return next(error);
  }

  res.status(201).json({
    message: 'Created new course successfully!',
    data: createdCourse,
  });
}) as RequestHandler;

// patch course content

// patch course (add user)

// delete course - or just disable course to avoid data loss, etc.
