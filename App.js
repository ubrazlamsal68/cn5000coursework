import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTeam from './components/AddTeam';
import UpdateTeam from './components/UpdateTeam';
import TeamSummary from './components/TeamSummary';
import DeleteTeam from './components/DeleteTeam';
import TopTeams from './components/TopTeams';
import AverageGoals from './components/AverageGoals';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Football Management</h1>
                <nav style={{ marginBottom: '20px' }}>
                    <Link to="/" style={{ marginRight: '10px' }}>Add Team</Link>
                    <Link to="/update" style={{ marginRight: '10px' }}>Update Team</Link>
                    <Link to="/summary" style={{ marginRight: '10px' }}>Team Summary</Link>
                    <Link to="/delete" style={{ marginRight: '10px' }}>Delete Team</Link>
                    <Link to="/top-teams" style={{ marginRight: '10px' }}>Top Teams</Link>
                    <Link to="/average-goals">Average Goals</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<AddTeam />} />
                    <Route path="/update" element={<UpdateTeam />} />
                    <Route path="/summary" element={<TeamSummary />} />
                    <Route path="/delete" element={<DeleteTeam />} />
                    <Route path="/top-teams" element={<TopTeams />} />
                    <Route path="/average-goals" element={<AverageGoals />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
