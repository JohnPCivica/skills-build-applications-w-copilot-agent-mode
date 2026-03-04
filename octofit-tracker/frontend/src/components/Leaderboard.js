import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';
    const endpoint = `${baseUrl}/api/leaderboard/`;
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Leaderboard data:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);
  return (
    <div>
      <h2>Leaderboard</h2>
      <div>
        {leaders.map((leader, idx) => (
          <div key={leader.id || idx} style={{border: '1px solid #ccc', borderRadius: '8px', padding: '1em', marginBottom: '1em'}}>
            <strong>Team:</strong> {leader.team}<br />
            <strong>Points:</strong> {leader.points}<br />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Leaderboard;
