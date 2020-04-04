import React, { useState } from "react";

import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

function PasswordChangeForm({ firebase }) {
  const [credentials, setCredentials] = useState(INITIAL_STATE);

  const { passwordOne, passwordTwo, error } = credentials;
  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

  function onSubmit(e) {
    e.preventDefault();

    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setCredentials(INITIAL_STATE);
      })
      .catch(error => {
        setCredentials(credentials => ({ ...credentials, error }));
      });
  }

  function onChange(e) {
    const { name, value } = e.target;

    setCredentials(credentials => ({
      ...credentials,
      [name]: value
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

export default withFirebase(PasswordChangeForm);
