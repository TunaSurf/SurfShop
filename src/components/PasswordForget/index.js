import React, { useState } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

function PasswordForgetFormBase({ firebase }) {
  const [credentials, setCredentials] = useState(INITIAL_STATE);

  const { email, error } = credentials;
  const isInvalid = email === "";

  function onSubmit(e) {
    e.preventDefault();

    firebase
      .doPasswordReset(email)
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

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
