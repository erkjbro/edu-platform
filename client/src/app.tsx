import { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from './components/site/landing/landing';
import { Navbar } from './components/site/navbar/navbar';
import { useActions } from './hooks/use-actions';
import { useTypedSelector as useSelector } from './hooks/use-typed-selector';

const Auth = lazy(() => import('./components/auth/auth'));
const AdminConsole = lazy(
  () => import('./components/admin/admin-console/admin-console')
);
const CourseDetails = lazy(
  () => import('./components/course/course-details/course-details')
);
const UserDetails = lazy(
  () => import('./components/user/user-details/user-details')
);
const Dashboard = lazy(
  () => import('./components/student/dashboard/dashboard')
);
const EditCourse = lazy(
  () => import('./components/admin/edit-course/edit-course')
);
const EditUser = lazy(() => import('./components/admin/edit-user/edit-user'));

const App = () => {
  const { token, userRole } = useSelector((state) => state.auth);
  const actions = useActions();

  useEffect(() => {
    actions.authCheckState();
  }, [actions]);

  let routes;

  if (token && userRole !== 'admin') {
    routes = (
      <Switch>
        <Route path='/' exact component={Dashboard} />
        <Route path='/course/:courseId' exact component={CourseDetails} />
        {/* Profile */}
        <Redirect to='/' />
      </Switch>
    );
  } else if (token && userRole === 'admin') {
    routes = (
      <Switch>
        <Route path='/admin' component={AdminConsole} />
        <Route path='/course/new' exact component={EditCourse} />
        <Route
          path='/course/edit/:courseId'
          exact
          render={() => <EditCourse editMode />}
        />
        <Route path='/course/:courseId' exact component={CourseDetails} />
        <Route path='/user/new' exact component={EditUser} />
        {/* Edit User */}
        <Route path='/user/:userId' exact component={UserDetails} />
        {/* Profile */}
        <Redirect to='/admin' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/auth' exact component={Auth} />
        <Redirect to='/' />
      </Switch>
    );
  }

  const Loader = () => <div>Loading...</div>;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={<Loader />}>{routes}</Suspense>
      </main>
    </>
  );
};

export default App;
