import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useFirebase } from '../shared/context';

export default function Admin() {
  const firebase = useFirebase();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = firebase.users().onSnapshot((snapshot) => {
      const usersList = [];

      snapshot.forEach((doc) => {
        usersList.push({ ...doc.data(), uid: doc.id });
      });

      setUsers(usersList);
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
      {users.map((user) => (
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

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
