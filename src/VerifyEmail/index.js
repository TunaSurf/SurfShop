import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { useFirebase, useAuthUser } from '../shared/context';
import * as ROUTES from '../shared/constants/routes';

export default function VerifyEmail() {
  const { authUser, loadingAuthUser } = useAuthUser();
  const location = useLocation();

  if (loadingAuthUser) {
    return <p>Loading...</p>;
  }

  if (authUser.emailVerified) {
    return <Redirect to={location.state?.fromPath || ROUTES.HOME} />;
  }

  return <Verify />;
}

function Verify() {
  const firebase = useFirebase();

  const [isSent, setIsSent] = useState(false);

  async function sendEmailVerification() {
    await firebase.sendEmailVerification;

    setIsSent(true);
  }

  return (
    <>
      {isSent ? (
        <p>
          Confirmation email sent: Check your email for a confirmation email.
          Refresh this page once you have confirmed your email.
        </p>
      ) : (
        <p>
          Verify your email: Check your email (spam folder included) for a
          confirmation email or send another confirmation email.
        </p>
      )}

      <button type="button" onClick={sendEmailVerification} disabled={isSent}>
        Send confirmation E-Mail
      </button>
    </>
  );
}
