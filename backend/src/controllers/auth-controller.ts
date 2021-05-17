import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

import HttpError from '../models/http-error.js';
import { User, UserDoc } from '../models/user.js';

export const postSignup = (async (req, res, next) => {
  // Validation Check... ?

  // Extract data from body
  const { firstName, lastName, email, password, role }: UserDoc = req.body;

  if (role === 'admin') {
    const { adminCode } = req.params;

    if (!adminCode || adminCode !== '424242') {
      const error = new HttpError(
        'User is not authorized to create an admin account.',
        403
      );
      return next(error);
    }
  }

  // Check if user exists already
  try {
    const existingUser = await User.findOne({ email });

    // Compare - User already exists - 422
    if (existingUser) {
      const error = new HttpError(
        'User exists already; please login instead.',
        422
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Signup failed; please try again later.', 500);
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
    const error = new HttpError('Signup failed; please try again.', 500);
    return next(error);
  }

  // sign jwt
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
        role: createdUser.role,
      },
      process.env.JWT_KEY as jwt.Secret,
      {
        expiresIn: '3h',
      }
    );
  } catch (err) {
    const error = new HttpError('Something went wrong; please try again.', 500);
    return next(error);
  }

  // respond w/ 201 & userId, userType, email, token
  res.status(201).json({
    message: 'Signup completed successfully!',
    payload: {
      userId: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
      token,
    },
  });
}) as RequestHandler;

export const postLogin = (async (req, res, next) => {
  // validation check

  // get data from body
  const { email, password }: UserDoc = req.body;

  // check if user / admin exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email });

    if (!existingUser) {
      const error = new HttpError('Invalid credentials; could not login.', 422);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError('Login failed; please try again later.', 500);
    return next(error);
  }

  // compare passwords
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      const error = new HttpError('Invalid credentials; could not login.', 401);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'Could not login; please check your credentials and try again.',
      500
    );
    return next(error);
  }

  // sign jwt
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_KEY as jwt.Secret,
      {
        expiresIn: '3h',
      }
    );
  } catch (err) {
    const error = new HttpError('Something went wrong; please try again.', 500);
    return next(error);
  }

  // respond w/ userId, userType, email, token
  res.json({
    message: 'Login completed successfully!',
    payload: {
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      token,
    },
  });
}) as RequestHandler;
