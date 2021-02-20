import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import Firebase from '../firebase';

export const FirebaseContext = createContext(null);

// This will be wrapped around App component in root index.js and provide firebase to entire app
export default function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  );
}

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to shorthand the retrieval of the firebase context
export const useFirebase = () => useContext(FirebaseContext);
