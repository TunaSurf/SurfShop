import React from 'react';

import { useAuthUser } from '../shared/context';
import VerifyEmailLink from '../shared/components/VerifyEmailLink';
import PasswordChangeForm from '../shared/components/forms/PasswordChangeForm';

export default function Account() {
  const { authUser } = useAuthUser();

  return (
    <>
      <p>Account</p>
      <p>The account page is accessible by every signed in user.</p>
      <p>Email: {authUser.email}</p>
      {!authUser.emailVerified && <VerifyEmailLink />}
      <p>Change Password</p>
      <PasswordChangeForm />
    </>
  );
}
