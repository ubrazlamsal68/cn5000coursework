import React, { useState } from 'react';
import axios from 'axios';

const AddTeam = () => {
    const initialState = {
        Team: '',
        GamesPlayed: '',
        Win: '',
        Draw: '',
        Loss: '',
        GoalsFor: '',
        GoalsAgainst: '',
        Points: '',
        Year: ''
    };

    const [teamData, setTeamData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeamData({ ...teamData, [name]: value });
    };

    const validateFields = () => {
        if (
            !teamData.Team ||
            isNaN(teamData.GamesPlayed) ||
            isNaN(teamData.Win) ||
            isNaN(teamData.Draw) ||
            isNaN(teamData.Loss) ||
            isNaN(teamData.GoalsFor) ||
            isNaN(teamData.GoalsAgainst) ||
            isNaN(teamData.Points) ||
            isNaN(teamData.Year)
        ) {
            alert("Please ensure all fields are filled correctly!");
            return false;
        }
        return true;
    };

    const parsedFields = (data) => ({
        ...data,
        GamesPlayed: parseInt(data.GamesPlayed) || 0,
        Win: parseInt(data.Win) || 0,
        Draw: parseInt(data.Draw) || 0,
        Loss: parseInt(data.Loss) || 0,
        GoalsFor: parseInt(data.GoalsFor) || 0,
        GoalsAgainst: parseInt(data.GoalsAgainst) || 0,
        Points: parseInt(data.Points) || 0,
        Year: parseInt(data.Year) || 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) return;

        setIsSubmitting(true);

        const formattedData = parsedFields(teamData);

        try {
            const response = await axios.post('http://localhost:5000/api/football', formattedData);
            alert('Team added successfully!');
            console.log(response.data);
            setTeamData(initialState);
        } catch (error) {
            console.error('Error adding team:', error.response ? error.response.data : error.message);
            alert('Failed to add team. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <h2>Add New Team</h2>
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
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Team'}
                </button>
            </form>
        </div>
    );
};

export default AddTeam;
