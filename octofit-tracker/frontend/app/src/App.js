
import React from 'react';
import octofitLogo from './octofitapp-small.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <header className="App-header" style={{boxShadow: '0 4px 16px rgba(78,84,200,0.12)', borderBottomLeftRadius: 24, borderBottomRightRadius: 24}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img src={octofitLogo} alt="Octofit Logo" className="App-logo" style={{height: 72, marginRight: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.10)'}} />
          <div>
            <h1 style={{margin: 0, fontSize: '2.5rem', letterSpacing: '2px', fontWeight: 800, color: '#fff', textShadow: '0 2px 8px rgba(78,84,200,0.18)'}}>Octofit Tracker</h1>
            <p style={{margin: 0, color: '#e0e7ff', fontWeight: 500, fontSize: '1.1rem'}}>Track, Compete, Improve</p>
          </div>
        </div>
      </header>
      <nav className="navbar navbar-expand-lg mb-4" style={{boxShadow: '0 2px 8px rgba(67,206,162,0.10)', borderRadius: 12}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="glass">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<h2 style={{color:'#4e54c8',textShadow:'0 2px 8px #c3cfe2'}}>Welcome to Octofit Tracker!</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
