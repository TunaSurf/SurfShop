import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

function SignInPage() {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <SignInGoogle />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
}

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

function SignInFormBase({ firebase, history }) {
  const [credentials, setCredentials] = useState(INITIAL_STATE);

  const { email, password, error } = credentials;
  const isInvalid = password === "" || email === "";

  function onSubmit(e) {
    e.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setCredentials(INITIAL_STATE);
        history.push(ROUTES.HOME);
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

function SignInGoogleBase({ firebase, history }) {
  const [error, setError] = useState(null);

  function onSubmit(e) {
    e.preventDefault();

    firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return firebase.user(socialAuthUser.user.uid).set(
          {
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: {}
          },
          { merge: true }
        );
      })
      .then(() => {
        setError(null);
        history.push(ROUTES.HOME);
      })
      .catch(err => {
        setError(err);
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In with Google</button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase);

export default SignInPage;

export { SignInForm, SignInGoogle };
