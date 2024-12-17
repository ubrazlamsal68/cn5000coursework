import React, { useState } from 'react';
import axios from 'axios';

const DeleteTeam = () => {
    // State to hold the team name input
    const [teamName, setTeamName] = useState('');

    // Handle input change
    const handleChange = (e) => {
        setTeamName(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send DELETE request to the backend
            const response = await axios.post('http://localhost:5000/api/football/delete', { Team: teamName });
            alert('Team deleted successfully!');
            console.log(response.data);

            // Reset the input field
            setTeamName('');
        } catch (error) {
            console.error('Error deleting team:', error.response ? error.response.data : error.message);
            alert('Failed to delete team. Please try again.');
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <h2>Delete Team</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Team Name: </label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Delete Team</button>
            </form>
        </div>
    );
};

export default DeleteTeam;
