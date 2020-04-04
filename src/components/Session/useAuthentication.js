import { useEffect, useState } from "react";

export default function useAuthentication(firebase) {
  // initialize with current user
  const [user, setUser] = useState(() => {
    const authUser = firebase.auth.currentUser;

    return authUser;
  });

  useEffect(() => {
    // listen for auth state changes
    const listener = firebase.onAuthUserListener(
      authUser => {
        setUser(authUser);
      },
      () => {
        setUser(null);
      }
    );

    // unsubscribe from the listener when unmounting
    return () => listener();
  }, [firebase]);

  return user;
}
