import { Request, RequestHandler } from 'express';
import mongoose from 'mongoose';

import HttpError from '../models/http-error.js';
import { Course, CourseDoc } from '../models/course.js';
import { User } from '../models/user.js';

// PUBLIC
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
    payload: courses,
  });
}) as RequestHandler;

export const getCourseById = (async (req, res, next) => {
  const { courseId } = req.params;

  let course;
  try {
    course = await Course.findById(courseId);

    if (!course) {
      const error = new HttpError(
        'Could not find a course for the provided id.',
        404
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  res.json({
    message: 'Fetched course by id successfully!',
    payload: course.toObject({ getters: true }),
  });
}) as RequestHandler;

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
    payload: createdCourse,
  });
}) as RequestHandler;

// patch course content
export const patchCourse = (async (req: any, res, next) => {
  const { title, description, skillLevel }: CourseDoc = req.body;
  const { userId, role } = req.userData;
  const { courseId } = req.params;

  if (role !== 'admin') {
    const error = new HttpError('You are not allowed to edit courses', 403);
    return next(error);
  }

  let course;
  try {
    course = await Course.findById(courseId);

    if (!course) {
      const error = new HttpError(
        'Could not find course with provided id.',
        404
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  course.title = title;
  course.description = description;
  course.skillLevel = skillLevel;

  try {
    await course.save();
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  res.json({
    message: 'Course updated successfully!',
    payload: course.toObject({ getters: true }),
  });
}) as RequestHandler;

// delete course - or just disable course to avoid data loss, etc.
export const deleteCourse = (async (req: any, res, next) => {
  const { userId, role } = req.userData;
  const { courseId } = req.params;

  if (role !== 'admin') {
    const error = new HttpError('You are not allowed to delete courses', 403);
    return next(error);
  }

  let course;
  try {
    course = await Course.findById(courseId);

    // Normally I'd populate the creator field, but it was returning null so
    // I came up with another solution to circumvent the issue and save time.

    // course = await Course.findById(courseId).populate('creator');

    if (!course) {
      const error = new HttpError(
        'Could not find course with provided id.',
        404
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  let creator;
  try {
    creator = await User.findById(course.creator);
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await course.remove({ session });

    if (creator) {
      creator.courses.pull(course);
      await creator.save({ session });
    }

    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  res.json({
    message: 'Course deleted successfully!',
  });
}) as RequestHandler;
