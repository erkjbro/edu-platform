import { model, Model, Schema, Types } from 'mongoose';

import { Course } from './interfaces';

const courseSchema: Schema = new Schema({
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

export const CourseModel: Model<Course> = model('Course', courseSchema);

/*
// course sessions?
term: "fall 2021, etc?"
students: [{
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: 'student',
    required: true
  },
}]
*/
