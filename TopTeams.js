import React, { useState } from 'react';
import axios from 'axios';

const TopTeams = () => {
    const [minWins, setMinWins] = useState('');
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    const fetchTeams = async () => {
        setError(null); // Reset any previous error
        setTeams([]); // Clear previous teams
        if (!minWins || isNaN(minWins) || parseInt(minWins) < 0) {
            setError("Please enter a valid minimum wins value.");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/api/football/wins/${minWins}`, {
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.data && Array.isArray(response.data)) {
                setTeams(response.data);
            } else {
                setTeams([]);
                setError("No teams found for the given criteria.");
            }
        } catch (err) {
            console.error("Error fetching teams:", err);
            setError("Failed to fetch teams. Please try again later.");
        }
    };

    return (
        <div>
            <h2>Top Teams</h2>
            <div>
                <label>Minimum Wins: </label>
                <input
                    type="number"
                    value={minWins}
                    onChange={(e) => setMinWins(e.target.value)}
                    placeholder="Enter minimum wins"
                />
                <button onClick={fetchTeams}>Fetch Teams</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {teams.length > 0 ? (
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>Games Played</th>
                                <th>Wins</th>
                                <th>Draws</th>
                                <th>Losses</th>
                                <th>Goals For</th>
                                <th>Goals Against</th>
                                <th>Points</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team, index) => (
                                <tr key={index}>
                                    <td>{team.Team}</td>
                                    <td>{team.GamesPlayed}</td>
                                    <td>{team.Win}</td>
                                    <td>{team.Draw}</td>
                                    <td>{team.Loss}</td>
                                    <td>{team.GoalsFor}</td>
                                    <td>{team.GoalsAgainst}</td>
                                    <td>{team.Points}</td>
                                    <td>{team.Year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !error && <p>No teams found for the given criteria.</p>
                )}
            </div>
        </div>
    );
};

export default TopTeams;
