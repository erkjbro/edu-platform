import mongoose from 'mongoose';

import { UserDoc } from './user.js';

interface CourseAttrs {
  title: string;
  creator: UserDoc['_id'];
}

export interface CourseDoc extends mongoose.Document {
  title: string;
  creator: UserDoc['_id'];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

interface CourseModel extends mongoose.Model<CourseDoc> {
  build(attrs: CourseAttrs): CourseDoc;
}

const courseSchema = new mongoose.Schema({
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

const Course = mongoose.model<CourseDoc, CourseModel>('Course', courseSchema);

export { Course };

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
