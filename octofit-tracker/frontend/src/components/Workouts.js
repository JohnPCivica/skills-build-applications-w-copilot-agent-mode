import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    workout_type: '',
    duration: '',
    difficulty: 'beginner',
  });

  useEffect(() => {
    fetch(`${API_BASE}/workouts/`)
      .then((r) => r.json())
      .then(setWorkouts)
      .catch(() => setError('Failed to load workouts.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE}/workouts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, duration: parseFloat(form.duration) }),
      });
      setShowForm(false);
      setForm({ name: '', description: '', workout_type: '', duration: '', difficulty: 'beginner' });
      const res = await fetch(`${API_BASE}/workouts/`);
      setWorkouts(await res.json());
    } catch (err) {
      setError('Failed to create workout.');
    }
  };

  const difficultyBadge = (difficulty) => {
    const colors = { beginner: 'success', intermediate: 'warning', advanced: 'danger' };
    return <span className={`badge bg-${colors[difficulty] || 'secondary'}`}>{difficulty}</span>;
  };

  const workoutIcon = (type) => {
    const icons = {
      cardio: '❤️',
      strength: '💪',
      flexibility: '🧘',
      hiit: '🔥',
      walking: '🚶',
      other: '⚡',
    };
    return icons[type] || '🏃';
  };

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>💪 Workout Suggestions</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Workout'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Add New Workout</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
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
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Workout Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.workout_type}
                    onChange={(e) => setForm({ ...form, workout_type: e.target.value })}
                    placeholder="e.g. cardio, strength"
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Duration (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Difficulty</label>
                  <select
                    className="form-select"
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-success">Add Workout</button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {workouts.map((workout) => (
          <div key={workout.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="mb-0">{workoutIcon(workout.workout_type)} {workout.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">⏱️ {workout.duration} min</span>
                  {difficultyBadge(workout.difficulty)}
                </div>
                <small className="text-muted mt-2 d-block">Type: {workout.workout_type}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
