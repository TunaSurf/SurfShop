import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useAuthUser } from '../../../shared/context';
import * as ROUTES from '../../../shared/constants/routes';
import * as ROLES from '../../../shared/constants/roles';
import SignOutButton from '../../../shared/components/SignOutButton';

export default function Navigation() {
  const { authUser } = useAuthUser();

  if (authUser) {
    return <AuthNav roles={authUser.roles} />;
  }

  return <UnAuthNav />;
}

function AuthNav({ roles }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {!!roles[ROLES.ADMIN] && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

function UnAuthNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}

AuthNav.propTypes = {
  roles: PropTypes.objectOf(PropTypes.bool).isRequired,
};
