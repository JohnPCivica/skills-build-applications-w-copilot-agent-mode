

import octofitLogo from './octofitapp-small.png';


function App() {
  return (
    <Router>
      <header className="App-header">
        <img src={octofitLogo} alt="Octofit Logo" className="App-logo" />
        <h1 style={{margin: 0}}>Octofit Tracker</h1>
      </header>
      <nav className="navbar navbar-expand-lg mb-4">
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
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<h2>Welcome to Octofit Tracker!</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
