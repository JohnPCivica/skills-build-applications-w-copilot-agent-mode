import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard/`)
      .then((r) => r.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.points - a.points);
        setLeaderboard(sorted);
      })
      .catch(() => setError('Failed to load leaderboard.'))
      .finally(() => setLoading(false));
  }, []);

  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getRowClass = (index) => {
    if (index === 0) return 'table-warning';
    if (index === 1) return 'table-secondary';
    if (index === 2) return 'table-danger';
    return '';
  };

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🏆 Leaderboard</h2>
      <div className="card">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Email</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id} className={getRowClass(index)}>
                  <td className="fw-bold">{getMedalEmoji(index)}</td>
                  <td>{entry.user ? entry.user.username : 'Unknown'}</td>
                  <td>{entry.user ? entry.user.email : '-'}</td>
                  <td>
                    <span className="badge bg-primary fs-6">{entry.points}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
