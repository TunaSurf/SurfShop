import React, { useState } from 'react';

import { useFirebase } from '../../../context';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
};

export default function PasswordChangeForm() {
  const firebase = useFirebase();

  const [credentials, setCredentials] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  const { passwordOne, passwordTwo } = credentials;
  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await firebase.updatePassword(passwordOne);

      setCredentials(INITIAL_STATE);
    } catch (error) {
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
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}
