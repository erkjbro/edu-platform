import { model, Document, Model, Schema, Types } from 'mongoose';

import { User } from './interfaces';

const userSchema: Schema = new Schema({
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
      type: Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  ],
});

export const UserModel: Model<User> = model('User', userSchema);
