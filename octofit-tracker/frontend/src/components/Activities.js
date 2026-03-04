import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000';
    const endpoint = `${baseUrl}/api/activities/`;
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities data:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);
  return (
    <div>
      <h2>Activities</h2>
      <div>
        {activities.map((activity, idx) => (
          <div key={activity.id || idx} style={{border: '1px solid #ccc', borderRadius: '8px', padding: '1em', marginBottom: '1em'}}>
            <strong>User:</strong> {activity.user}<br />
            <strong>Type:</strong> {activity.type}<br />
            <strong>Duration:</strong> {activity.duration} mins<br />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Activities;
