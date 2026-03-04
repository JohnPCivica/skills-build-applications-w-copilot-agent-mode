import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
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
            <strong>Name:</strong> {activity.name}<br />
            <strong>Type:</strong> {activity.type}<br />
            <strong>Date:</strong> {activity.date}<br />
            <strong>Duration:</strong> {activity.duration} mins<br />
            <strong>Notes:</strong> {activity.notes || 'None'}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Activities;
