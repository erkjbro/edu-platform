import { RequestHandler } from 'express';
import HttpError from '../models/http-error.js';

import { User } from '../models/user.js';

// find users [filter / pagination]
export const getUsers = (async (req, res, next) => {
  let users;

  // try / catch
  users = await User.find({}, '-password');

  res.json({
    message: 'Fetched users successfully!',
    data: users,
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

  // Who has AuthZ to fetch users by id?

  res.json({
    message: 'Found user successfully!',
    data: user.toObject({ getters: true }),
  });
}) as RequestHandler;

// find user courses?

// patch user (profile)

// patch user (course signup)

// delete user
