import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

export default function VerifyEmailLink() {
  return (
    <p>
      <Link to={ROUTES.VERIFY_EMAIL}>Verify email</Link> and secure your account
    </p>
  );
}
