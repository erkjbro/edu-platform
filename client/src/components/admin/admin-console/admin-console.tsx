import { useRouteMatch, Route, Switch, NavLink } from 'react-router-dom';

// import { useTypedSelector as useSelector } from '../../../hooks/use-typed-selector';
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
          <p>Course List...</p>
        </Route>
        <Route path={`${match.path}/students`}>
          <p>Student List...</p>
        </Route>
      </Switch>
    </div>
  );
};

export { AdminConsole };
