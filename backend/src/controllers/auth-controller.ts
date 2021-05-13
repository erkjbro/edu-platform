import { RequestHandler } from 'express';

// import HttpError from '../models/http-error.js';

export const postSignup = (async (req, res, next) => {
  // validation check

  // get data from body

  // signup for admin or user?

  // check against existing data

  // hash password

  // create admin | user using model

  // save to db

  // sign jwt

  // respond w/ 201 & userId, userType, email, token
  res.json({
    message: 'signup route',
    data: null,
  });
}) as RequestHandler;

export const postLogin = (async (req, res, next) => {
  // validation check
  res.json({
    message: 'login route',
    data: null,
  });

  // get data from body

  // check if user / admin exists

  // compare passwords

  // sign jwt

  // respond w/ userId, userType, email, token
}) as RequestHandler;
