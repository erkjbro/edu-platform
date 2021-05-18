import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { CourseDoc } from './course.js';

export type UserRole = 'student' | 'teacher' | 'admin';

// An interface that describes the properties
// that are required to create a new User.
interface UserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

// An interface that describes the properties
// that a User Document has.
export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  courses: CourseDoc;
}

// An interface that describes the properties
// that a User Model has.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
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

userSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.',
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
