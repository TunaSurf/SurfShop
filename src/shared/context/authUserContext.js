import { useState, useEffect, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { useFirebase } from './firebaseContext';

export const authUserContext = createContext();

// Accepts a firebase instance when called
export default function AuthUserProvider({ children }) {
  const firebase = useFirebase();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen for authenticated user
    // On state change, get the authUser, get the db user entry using authUser uid, merge
    // critical information into a unified user object, and setUser.
    // If authUser returns null, setUser to null.
    const unsubscriber = firebase.onAuthStateChanged(async (authUser) => {
      try {
        // State has changed, reset loading
        setLoadingUser(true);

        if (authUser) {
          // User is signed in.
          const snapshot = await firebase.user(authUser.uid).get();
          const dbUser = snapshot.data();

          if (!dbUser.roles) {
            dbUser.roles = {};
          }
          // merge auth user and db user into one 'mergedUser'
          const mergedUser = {
            uid: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            displayName: authUser.displayName,
            photoUrl: authUser.photoURL,
            providerData: authUser.providerData,
            ...dbUser,
          };

          setUser(mergedUser);
        } else {
          // User is signed out.
          setUser(null);
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
        console.log(error);
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, [firebase]);

  return (
    <authUserContext.Provider
      value={{ authUser: user, loadingAuthUser: loadingUser }}
    >
      {children}
    </authUserContext.Provider>
  );
}

AuthUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook that shorthands the context!
export const useAuthUser = () => useContext(authUserContext);
