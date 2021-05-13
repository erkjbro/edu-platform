import express, { RequestHandler, ErrorRequestHandler } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { authRoutes } from './routes/auth-routes.js';
import HttpError from './models/http-error.js';

const PORT = Number(process.env.PORT || 5000);

const app = express();

try {
  await mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} catch (err) {
  throw new HttpError(err, 503);
}

// parse request body
app.use(express.json());

// enable cors
app.use(cors());

// --- API Routes ---
app.get('/', ((req, res, next) => {
  res.json({
    message: '/ Route',
    data: null,
  });
}) as RequestHandler);

app.use('/api/auth', authRoutes);

// --- Error Routes ---

// 404 catch
app.use(((req, res, next) => {
  const error = new HttpError("Sorry, I don't seem to have that route...", 404);
  next(error);
}) as RequestHandler);

// error processing
app.use(((err, req, res, next) => {
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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
