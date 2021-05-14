import { RequestHandler } from 'express';

import { User } from '../models/user.js';

// find users [filter / pagination]
export const getUsers = (async (req, res, next) => {
  let users;

  // try / catch
  users = await User.find({});

  res.json({
    message: 'Fetched users successfully!',
    data: users,
  });
}) as RequestHandler;

// find userById

// find user courses?

// patch user (profile)

// patch user (course signup)

// delete user
