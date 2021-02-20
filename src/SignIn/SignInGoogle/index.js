import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useFirebase } from '../../shared/context';
import * as ROUTES from '../../shared/constants/routes';

export default function SignInGoogle() {
  const firebase = useFirebase();
  const history = useHistory();
  const location = useLocation();

  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();

    try {
      // Try to sign in the user
      await firebase.signInWithGoogle();
      // User signed in, send user to home page
      history.push(location.state?.fromPath || ROUTES.HOME);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In with Google</button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
