import mongoose, { Model, Schema } from 'mongoose';

import { Course } from './interfaces/index.js';

const courseSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
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

export const CourseModel: Model<Course> = mongoose.model(
  'Course',
  courseSchema
);

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
