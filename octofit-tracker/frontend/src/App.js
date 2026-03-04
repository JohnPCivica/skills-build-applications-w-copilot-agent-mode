import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <NavLink className="navbar-brand d-flex align-items-center" to="/">
              <img src={logo} alt="OctoFit" height="40" className="me-2" />
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={
              <div className="container mt-5 text-center">
                <img src={logo} alt="OctoFit Tracker" className="mb-4" style={{ maxWidth: '150px' }} />
                <h1 className="display-4">Welcome to OctoFit Tracker</h1>
                <p className="lead text-muted">
                  Track your fitness, compete with friends, and reach your goals!
                </p>
                <div className="row mt-4">
                  <div className="col-md-4 mb-3">
                    <div className="card border-primary">
                      <div className="card-body">
                        <h3>🏃 Track Activities</h3>
                        <p>Log your workouts and stay on top of your progress.</p>
                        <NavLink className="btn btn-primary" to="/activities">Get Started</NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card border-success">
                      <div className="card-body">
                        <h3>🏆 Compete</h3>
                        <p>Join teams and climb the leaderboard.</p>
                        <NavLink className="btn btn-success" to="/leaderboard">View Rankings</NavLink>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card border-warning">
                      <div className="card-body">
                        <h3>💪 Workouts</h3>
                        <p>Get personalized workout suggestions.</p>
                        <NavLink className="btn btn-warning" to="/workouts">Explore</NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path="/users" element={<UserProfile />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

