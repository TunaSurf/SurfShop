import React from "react";

import { withFirebase } from "../Firebase";
import AuthUserContext from "./context";
import useAuthentication from "./useAuthentication";

function withAuthentication(Component) {
  function WithAuthentication(props) {
    const authUser = useAuthentication(props.firebase);

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  }

  return withFirebase(WithAuthentication);
}

export default withAuthentication;
