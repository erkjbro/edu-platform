import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';

import HttpError from '../models/http-error.js';
import { User, UserDoc, UserRole } from '../models/user.js';

export const getUsers = (async (req, res, next) => {
  let users;

  try {
    users = await User.find({ role: { $ne: 'admin' } }, '-password');

    if (!users) {
      const error = new HttpError('Users not found', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  res.json({
    message: 'Fetched users successfully!',
    payload: users,
  });
}) as RequestHandler;

// find users by role
export const getUsersByRole = (async (req, res, next) => {
  let { userRole } = req.params;

  if (!userRole) {
    userRole = 'student';
  }

  let users;
  try {
    users = await User.find(
      { role: { $eq: `${userRole}` as UserRole } },
      '-password'
    );

    console.log(users);

    if (!users) {
      const error = new HttpError('No users were found with this role.', 404);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  res.json({
    message: 'Fetched students successfully!',
    payload: users.map((user) => user.toObject({ getters: true })),
  });
}) as RequestHandler;

// find userById
export const getUserById = (async (req, res, next) => {
  const { userId } = req.params;

  let user;
  try {
    user = await User.findById(userId, '-password');

    if (!user) {
      const error = new HttpError(
        'User could not be found with the provided id.',
        404
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong', 500);
    return next(error);
  }

  res.json({
    message: 'Found user successfully!',
    payload: user.toObject({ getters: true }),
  });
}) as RequestHandler;

export const postUser = (async (req: any, res, next) => {
  // Validation Check... ?

  // Extract data from body
  const { firstName, lastName, email, password, role }: UserDoc = req.body;

  const userRole = req.userData.role; // avoiding a naming conflict

  if (userRole !== 'admin') {
    const error = new HttpError('You are not allowed to create courses', 403);
    return next(error);
  }

  // Check if user exists already
  try {
    const existingUser = await User.findOne({ email });

    // Compare - User already exists - 422
    if (existingUser) {
      const error = new HttpError('User exists already.', 422);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  // hash password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Signup failed; please try again.', 500);
    return next(error);
  }

  // create user
  const createdUser = new User({
    firstName,
    lastName,
    role,
    email,
    password: hashedPassword,
    courses: [],
  });

  // save to db
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Something went wrong.', 500);
    return next(error);
  }

  // respond w/ 201 & userId, userType, email, token
  res.status(201).json({
    message: 'Signup completed successfully!',
    payload: createdUser,
  });
}) as RequestHandler;

// patch user

// delete user
