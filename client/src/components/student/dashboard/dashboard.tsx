import CourseTab from '../../course/course-tab/course-tab';
import './dashboard.scss';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <h1>Student Dashboard</h1>
      <CourseTab />
    </div>
  );
};

export default Dashboard;
