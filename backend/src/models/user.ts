import mongoose, { Model, Schema } from 'mongoose';

import { User } from './interfaces/index.js';

const userSchema: Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  ],
});

export const UserModel: Model<User> = mongoose.model('User', userSchema);
