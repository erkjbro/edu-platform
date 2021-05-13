import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { RequestHandler } from 'express';

import HttpError from '../models/http-error.js';
import { UserModel } from '../models/user.js';
import { User } from '../models/interfaces/index.js';

export const postSignup = (async (req, res, next) => {
  // Validation Check... ?

  // Extract data from body
  const { firstName, lastName, email, password, role }: User = req.body;

  // Check if user exists already
  try {
    const existingUser = await UserModel.findOne({ email });

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
  const createdUser = new UserModel({
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
    data: {
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

  // check if user / admin exists

  // compare passwords

  // sign jwt

  // respond w/ userId, userType, email, token
  res.json({
    message: 'login route',
    data: null,
  });
}) as RequestHandler;
