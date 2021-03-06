import React, { useEffect, useState } from "react";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";

function AdminPage({ firebase }) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firebase.users().onSnapshot(snapshot => {
      let users = [];

      snapshot.forEach(doc => {
        users.push({ ...doc.data(), uid: doc.id });
      });

      setUsers(users);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebase]);

  return (
    <div>
      <h1>Admin</h1>
      <p>The Admin Page is accessible by every signed in admin user.</p>
      {loading && <div>Loading ...</div>}
      <UserList users={users} />
    </div>
  );
}

function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  );
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase
)(AdminPage);
