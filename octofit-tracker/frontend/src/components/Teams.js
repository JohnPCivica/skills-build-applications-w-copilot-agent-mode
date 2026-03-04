import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';
    const endpoint = `${baseUrl}/api/teams/`;
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams data:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);
  return (
    <div>
      <h2>Teams</h2>
      <div>
        {teams.map((team, idx) => (
          <div key={team.id || idx} style={{border: '1px solid #ccc', borderRadius: '8px', padding: '1em', marginBottom: '1em'}}>
            <strong>Name:</strong> {team.name}<br />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Teams;
