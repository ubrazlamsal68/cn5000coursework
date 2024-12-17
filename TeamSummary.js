import React, { useState } from 'react';
import axios from 'axios';

const TeamSummary = () => {
    const [year, setYear] = useState('');
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the year input
        if (isNaN(year) || year.trim() === '') {
            setError('Invalid year. Please enter a valid number.');
            return;
        }

        setError('');
        setSummary(null);

        try {
            const response = await axios.get(`http://localhost:5000/api/football/summary/${year}`);
            setSummary(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching summary.');
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <h2>Team Summary</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Year:
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Enter year"
                        required
                    />
                </label>
                <button type="submit">Get Summary</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {summary && (
                <div>
                    <h3>Summary for {summary.year}</h3>
                    <p>Total Games Played: {summary.totalGamesPlayed}</p>
                    <p>Total Wins: {summary.totalWins}</p>
                    <p>Total Draws: {summary.totalDraws}</p>
                </div>
            )}
        </div>
    );
};

export default TeamSummary;
