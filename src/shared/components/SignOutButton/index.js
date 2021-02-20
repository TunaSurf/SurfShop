import React from 'react';

import { useFirebase } from '../../context';

export default function SignOut() {
  const firebase = useFirebase();

  return (
    <button type="button" onClick={firebase.signOut}>
      Sign Out
    </button>
  );
}
