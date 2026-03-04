import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';
    const endpoint = `${baseUrl}/api/workouts/`;
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts data:', results);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);
  return (
    <div>
      <h2>Workouts</h2>
      <div>
        {workouts.map((workout, idx) => (
          <div key={workout.id || idx} style={{border: '1px solid #ccc', borderRadius: '8px', padding: '1em', marginBottom: '1em'}}>
            <strong>Name:</strong> {workout.name}<br />
            <strong>Difficulty:</strong> {workout.difficulty}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Workouts;
