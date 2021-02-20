import React, { useState } from 'react';

import { useFirebase } from '../../../context';

const INITIAL_STATE = {
  email: '',
};

export default function PasswordForgetForm() {
  const firebase = useFirebase();

  const [credentials, setCredentials] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);

  const { email } = credentials;
  const isInvalid = email === '';

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await firebase.sendPasswordResetEmail(email);

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
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}
