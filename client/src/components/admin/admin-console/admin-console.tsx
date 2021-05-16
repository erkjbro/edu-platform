import { useRouteMatch, Route, Switch, NavLink } from 'react-router-dom';

import { CourseTab } from './course-tab/course-tab';
import { UserTab } from './user-tab/user-tab';
import './admin-console.scss';

const AdminConsole = () => {
  const match = useRouteMatch();

  return (
    <div className='admin-console__layout'>
      <div className='console-tabs'>
        <ul>
          <li>
            <NavLink exact activeClassName='tab-active' to={match.url}>
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              activeClassName='tab-active'
              to={`${match.url}/students`}
            >
              Students
            </NavLink>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path={match.path}>
          <CourseTab />
        </Route>
        <Route path={`${match.path}/students`}>
          <UserTab />
        </Route>
      </Switch>
    </div>
  );
};

export { AdminConsole };
