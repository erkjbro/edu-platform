// import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './course-details.scss';

const CourseDetails = () => {
  const { courseId }: { courseId: any } = useParams();

  console.log('course details:', courseId);

  return (
    <div>
      <h1>Course Details</h1>
    </div>
  );
};

export default CourseDetails;
