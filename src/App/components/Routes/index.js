import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import * as ROUTES from '../../../shared/constants/routes';
import * as ROLES from '../../../shared/constants/roles';
import ProtectedRoute from '../ProtectedRoute';

import SignUp from '../../../SignUp';
import SignIn from '../../../SignIn';
import PasswordForget from '../../../PasswordForget';
import Home from '../../../Home';
import Account from '../../../Account';
import Admin from '../../../Admin';
import VerifyEmail from '../../../VerifyEmail';

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to={ROUTES.HOME} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route path={ROUTES.HOME} component={Home} />
      <ProtectedRoute
        path={ROUTES.ACCOUNT}
        component={Account}
        condition={(authUser) => !!authUser}
        redirectTo={ROUTES.SIGN_IN}
      />
      <ProtectedRoute
        path={ROUTES.ADMIN}
        component={Admin}
        condition={(authUser) => !!authUser && !!authUser.roles[ROLES.ADMIN]}
        verifiedEmailRequired
        redirectTo={ROUTES.HOME}
      />
      <Route path={ROUTES.VERIFY_EMAIL} component={VerifyEmail} />
    </Switch>
  );
}
