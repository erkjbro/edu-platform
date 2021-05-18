import express, { RequestHandler, ErrorRequestHandler } from 'express';

import HttpError from '../models/http-error.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    message: 'Status is green.',
  });
});

// 404 catch
router.use(((req, res, next) => {
  const error = new HttpError("Sorry, I don't seem to have that route...", 404);
  next(error);
}) as RequestHandler);

// error processing
router.use(((err, req, res, next) => {
  const { statusCode, message, data } = err;

  // During development I like to console.error the err.stack,
  // but I wanted to make the error output clean for the demo.
  console.log("Here's what went wrong...");
  console.log('Status Code:', statusCode);
  console.log('Error Message:', message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode || 500).json({
    message: message || 'Something broke on our side!',
    data: data || null,
  });
}) as ErrorRequestHandler);

export { router as errorRoutes };
