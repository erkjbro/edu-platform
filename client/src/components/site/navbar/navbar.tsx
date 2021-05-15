import { NavLink } from 'react-router-dom';

import './navbar.scss';

const Navbar = () => {
  let authLinks;

  authLinks = (
    <>
      <li>
        <NavLink exact activeClassName={'active'} to='/auth'>
          Auth
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className='navbar'>
      <NavLink to='/' className='navbar__brand'>
        EDU Platform
      </NavLink>
      <ul>
        <li>
          <NavLink exact activeClassName={'active'} to='/'>
            Home
          </NavLink>
        </li>
        {authLinks}
      </ul>
    </nav>
  );
};

export default Navbar;
