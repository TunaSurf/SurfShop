import React from 'react';

import SignInForm from '../shared/components/forms/SignInForm';
import SignInGoogle from './SignInGoogle';
import SignUpLink from '../shared/components/SignUpLink';
import PasswordForgetLink from '../shared/components/PasswordForgetLink';

export default function SignIn() {
  return (
    <>
      <h1>SignIn</h1>
      <SignInForm />
      <SignInGoogle />
      <PasswordForgetLink />
      <SignUpLink />
    </>
  );
}
