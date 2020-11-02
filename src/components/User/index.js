import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";

function UserBase({ firebase, match }) {
  const { userID } = match.params;

  return <div>{userID}</div>;
}

const User = compose(withRouter, withFirebase)(UserBase);

export default User;
