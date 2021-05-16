import { NavLink } from 'react-router-dom';

import { useTypedSelector as useSelector } from '../../../hooks/use-typed-selector';
import { useActions } from '../../../hooks/use-actions';
import { Button } from '../../ui-kit';

import './navbar.scss';

const Navbar = () => {
  const { token, userRole } = useSelector((state) => state.auth);
  const actions = useActions();

  let authLinks;

  if (token && userRole === 'admin') {
    authLinks = (
      <>
        <li>
          <Button onClick={actions.authLogout}>LOGOUT</Button>
        </li>
      </>
    );
  } else if (token) {
    authLinks = (
      <>
        <li>
          <Button onClick={actions.authLogout}>LOGOUT</Button>
        </li>
      </>
    );
  } else {
    authLinks = (
      <>
        <li>
          <NavLink exact activeClassName={'active'} to='/auth'>
            Auth
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <nav className='navbar'>
      <NavLink to='/' className='navbar__brand'>
        EDU Platform
      </NavLink>
      <ul>
        <li>
          <NavLink exact activeClassName={'active'} to='/'>
            {token
              ? userRole === 'admin'
                ? 'Admin Console'
                : 'Dashboard'
              : 'Home'}
          </NavLink>
        </li>
        {authLinks}
      </ul>
    </nav>
  );
};

export default Navbar;
