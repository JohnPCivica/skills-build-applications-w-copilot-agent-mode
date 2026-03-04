import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', members: [] });

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/teams/`).then((r) => r.json()),
      fetch(`${API_BASE}/users/`).then((r) => r.json()),
    ])
      .then(([t, u]) => {
        setTeams(t);
        setUsers(u);
      })
      .catch(() => setError('Failed to load teams.'))
      .finally(() => setLoading(false));
  }, []);

  const handleMemberToggle = (userId) => {
    const id = String(userId);
    setForm((prev) => ({
      ...prev,
      members: prev.members.includes(id)
        ? prev.members.filter((m) => m !== id)
        : [...prev.members, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE}/teams/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ name: '', description: '', members: [] });
      const res = await fetch(`${API_BASE}/teams/`);
      setTeams(await res.json());
    } catch (err) {
      setError('Failed to create team.');
    }
  };

  const getMemberNames = (memberIds) => {
    return memberIds
      .map((id) => {
        const user = users.find((u) => String(u.id) === String(id));
        return user ? user.username : id;
      })
      .join(', ');
  };

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Teams</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create Team'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Create New Team</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Team Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows="2"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Members</label>
                <div className="row">
                  {users.map((user) => (
                    <div key={user.id} className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={form.members.includes(String(user.id))}
                          onChange={() => handleMemberToggle(user.id)}
                          id={`user-${user.id}`}
                        />
                        <label className="form-check-label" htmlFor={`user-${user.id}`}>
                          {user.username}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-success">Create Team</button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {teams.map((team) => (
          <div key={team.id} className="col-md-6 mb-3">
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">🏆 {team.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{team.description}</p>
                <p className="card-text">
                  <strong>Members:</strong>{' '}
                  {team.members.length > 0 ? getMemberNames(team.members) : 'No members yet'}
                </p>
                <small className="text-muted">
                  Created: {new Date(team.created_at).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
