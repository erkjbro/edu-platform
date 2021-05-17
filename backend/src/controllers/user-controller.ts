import { RequestHandler } from 'express';
import HttpError from '../models/http-error.js';

import { User, UserRole } from '../models/user.js';

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
  // try / catch
  user = await User.findById(userId, '-password');

  if (!user) {
    const error = new HttpError(
      'User could not be found with the provided id.',
      404
    );
    return next(error);
  }

  // AuthZ only to admins and users having that ID.

  res.json({
    message: 'Found user successfully!',
    payload: user.toObject({ getters: true }),
  });
}) as RequestHandler;

// patch user

// delete user
