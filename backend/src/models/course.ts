import { model, Document, Model, Schema, Types } from 'mongoose';

import { IUser } from './user';

export interface ICourse extends Document {
  title: string;
  creator: IUser['_id'];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

const CourseSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: Types.ObjectId,
    required: true,
  },
  skillLevel: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Course: Model<ICourse> = model('Course', CourseSchema);

export default Course;
