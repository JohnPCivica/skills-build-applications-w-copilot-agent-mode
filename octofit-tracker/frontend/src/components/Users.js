import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';
    const endpoint = `${baseUrl}/api/users/`;
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users data:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <div>
        {users.map((user, idx) => (
          <div key={user.id || idx} style={{border: '1px solid #ccc', borderRadius: '8px', padding: '1em', marginBottom: '1em'}}>
            <strong>Name:</strong> {user.name}<br />
            <strong>Email:</strong> {user.email}<br />
            <strong>Team:</strong> {user.team || 'None'}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Users;
