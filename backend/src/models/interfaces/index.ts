import { Document } from 'mongoose';

export interface Course extends Document {
  title: string;
  creator: User['_id'];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
}
