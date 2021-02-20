import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useFirebase } from '../../../context';
import * as ROLES from '../../../constants/roles';
import * as ROUTES from '../../../constants/routes';

const INITIAL_STATE = {
  displayName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
};

export default function SignUpForm() {
  const firebase = useFirebase();
  const history = useHistory();

  const [credentials, setCredentials] = useState(INITIAL_STATE);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const { displayName, email, passwordOne, passwordTwo } = credentials;
  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    displayName === '';

  async function onSubmit(e) {
    e.preventDefault();

    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = true;
    }

    try {
      // Authorize new user
      await firebase.createUserWithEmailAndPassword({
        email,
        password: passwordOne,
        displayName,
        roles,
      });
      // User authorized and added to db successfully, send user to home page
      history.push(ROUTES.HOME);
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

  function onChangeCheckbox(e) {
    const { checked } = e.target;

    setIsAdmin(checked);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={displayName}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <label>
        Admin:
        <input
          name="isAdmin"
          type="checkbox"
          checked={isAdmin}
          onChange={onChangeCheckbox}
        />
      </label>
      <button type="submit" disabled={isInvalid}>
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}
