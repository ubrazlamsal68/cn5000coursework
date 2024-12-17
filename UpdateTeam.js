import React, { useState } from 'react';
import axios from 'axios';

const UpdateTeam = () => {
    // State to hold form input values
    const [teamData, setTeamData] = useState({
        Team: '',
        GamesPlayed: '',
        Win: '',
        Draw: '',
        Loss: '',
        GoalsFor: '',
        GoalsAgainst: '',
        Points: '',
        Year: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeamData({ ...teamData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Parse numeric fields to numbers
        const formattedData = {
            ...teamData,
            GamesPlayed: parseInt(teamData.GamesPlayed),
            Win: parseInt(teamData.Win),
            Draw: parseInt(teamData.Draw),
            Loss: parseInt(teamData.Loss),
            GoalsFor: parseInt(teamData.GoalsFor),
            GoalsAgainst: parseInt(teamData.GoalsAgainst),
            Points: parseInt(teamData.Points),
            Year: parseInt(teamData.Year)
        };

        try {
            // Send POST request to the backend API
            const response = await axios.post('http://localhost:5000/api/football/update', formattedData);
            alert('Team updated successfully!');
            console.log(response.data);

            // Reset the form
            setTeamData({
                Team: '',
                GamesPlayed: '',
                Win: '',
                Draw: '',
                Loss: '',
                GoalsFor: '',
                GoalsAgainst: '',
                Points: '',
                Year: ''
            });
        } catch (error) {
            console.error('Error updating team:', error.response ? error.response.data : error.message);
            alert('Failed to update team. Please try again.');
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <h2>Update Team</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Team: </label>
                    <input type="text" name="Team" value={teamData.Team} onChange={handleChange} required />
                </div>
                <div>
                    <label>Games Played: </label>
                    <input type="number" name="GamesPlayed" value={teamData.GamesPlayed} onChange={handleChange} required />
                </div>
                <div>
                    <label>Win: </label>
                    <input type="number" name="Win" value={teamData.Win} onChange={handleChange} required />
                </div>
                <div>
                    <label>Draw: </label>
                    <input type="number" name="Draw" value={teamData.Draw} onChange={handleChange} required />
                </div>
                <div>
                    <label>Loss: </label>
                    <input type="number" name="Loss" value={teamData.Loss} onChange={handleChange} required />
                </div>
                <div>
                    <label>Goals For: </label>
                    <input type="number" name="GoalsFor" value={teamData.GoalsFor} onChange={handleChange} required />
                </div>
                <div>
                    <label>Goals Against: </label>
                    <input type="number" name="GoalsAgainst" value={teamData.GoalsAgainst} onChange={handleChange} required />
                </div>
                <div>
                    <label>Points: </label>
                    <input type="number" name="Points" value={teamData.Points} onChange={handleChange} required />
                </div>
                <div>
                    <label>Year: </label>
                    <input type="number" name="Year" value={teamData.Year} onChange={handleChange} required />
                </div>
                <button type="submit">Update Team</button>
            </form>
        </div>
    );
};

export default UpdateTeam;
