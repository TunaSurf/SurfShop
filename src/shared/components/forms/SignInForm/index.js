import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useFirebase } from '../../../context';
import * as ROUTES from '../../../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export default function SignInForm() {
  const firebase = useFirebase();
  const history = useHistory();
  const location = useLocation();

  const [credentials, setCredentials] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  const { email, password } = credentials;
  const isInvalid = password === '' || email === '';

  async function onSubmit(e) {
    e.preventDefault();

    try {
      // Try to sign in the user
      await firebase.signInWithEmailAndPassword(email, password);
      // User signed in, send user to home page
      history.push(location.state?.fromPath || ROUTES.HOME);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}
