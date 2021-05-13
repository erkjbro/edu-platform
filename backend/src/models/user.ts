import { model, Document, Model, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
}

const UserSchema: Schema = new Schema({
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

const User: Model<IUser> = model('User', UserSchema);

export default User;
